import test from 'node:test';import assert from 'node:assert/strict';
import {calculate,validateField,diagnosis,type Answers} from '../lib/calculation';
const base:Answers={age:28,occupation:'会社員（正社員）',income:300000,hours:8,days:20,commute:30,overtime:20};
test('往復通勤と残業、年間時間を計算する',()=>{const r=calculate(base);assert.equal(r.totalHours,200);assert.equal(r.hourly,1500);assert.equal(r.annualHours,2400);assert.equal(r.extraHours,40);assert.equal(r.regularHourly,1875);assert.equal(r.reduction,20);});
test('通勤と残業ゼロなら通常時給と一致',()=>{const r=calculate({...base,commute:0,overtime:0});assert.equal(r.hourly,r.regularHourly);});
test('不正入力を拒否',()=>{for(const [f,v] of [['age',14],['income',0],['hours',7.3],['days',20.5],['commute',-1],['overtime',Infinity],['income',''],['occupation','無効']] as const)assert.ok(validateField(f,v));assert.equal(validateField('commute',0),null);assert.equal(validateField('hours',7.5),null);});
test('物理的な上限を超える組み合わせを拒否',()=>assert.throws(()=>calculate({...base,hours:24}),/24時間/));
test('小数の時間を丸めず計算',()=>{const r=calculate({...base,hours:7.5,commute:1,overtime:0.5});assert.ok(Math.abs(r.totalHours-(150+2/3+0.5))<1e-9);});
test('診断コメントの境界',()=>{assert.match(diagnosis(3000).title,/高水準/);assert.match(diagnosis(1500).title,/バランス/);assert.match(diagnosis(1499).title,/見直す/);});
