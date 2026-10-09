export const occupations=['会社員（正社員）','契約社員・派遣社員','パート・アルバイト','公務員','自営業・フリーランス','その他'] as const;
export type Answers={age:number;occupation:string;income:number;hours:number;days:number;commute:number;overtime:number};
export type Field=keyof Answers;
export const limits={age:[15,100,1],income:[1,10000000,1],hours:[0.5,24,0.5],days:[1,31,1],commute:[0,360,1],overtime:[0,300,0.5]} as const;
export function validateField(field:Field,value:unknown):string|null{
 if(field==='occupation')return occupations.includes(value as typeof occupations[number])?null:'職業・雇用形態を選んでください。';
 if(value===''||value===undefined||value===null)return '数値を入力してください。';
 const [min,max,step]=limits[field];const n=Number(value);
 if(!Number.isFinite(n)||n<min||n>max)return `${min.toLocaleString('ja-JP')}〜${max.toLocaleString('ja-JP')}の範囲で入力してください。`;
 return Math.abs(n/step-Math.round(n/step))>1e-6?`${step}刻みで入力してください。`:null;
}
export function calculate(a:Answers){
 for(const field of ['age','occupation','income','hours','days','commute','overtime'] as Field[]){const error=validateField(field,a[field]);if(error)throw new Error(error);}
 const regularHours=a.hours*a.days,commuteHours=a.commute*2/60*a.days,extraHours=commuteHours+a.overtime,totalHours=regularHours+extraHours;
 if(totalHours>a.days*24)throw new Error('勤務・残業・通勤の合計が勤務日数×24時間を超えています。入力内容を見直してください。');
 return {regularHours,commuteHours,extraHours,totalHours,annualHours:totalHours*12,hourly:a.income/totalHours,regularHourly:a.income/regularHours,reduction:extraHours/totalHours*100};
}
export const format=(n:number,decimals=0)=>n.toLocaleString('ja-JP',{maximumFractionDigits:decimals});
export function diagnosis(n:number){
 if(n>=3000)return {title:'時間あたりの収入は、かなり高水準です',body:'今の働き方で得られる時間の価値を確認できました。収入だけでなく、休息や仕事の満足度も大切にしましょう。'};
 if(n>=1500)return {title:'収入と時間のバランスを確かめてみましょう',body:'通勤や残業を減らせると、同じ月収でも実質時給は上がります。あなたにとって心地よい働き方を考えるきっかけに。'};
 return {title:'働き方を見直す余地があるかもしれません',body:'通勤や残業が時間あたりの収入に影響しているかもしれません。勤務条件や働く場所など、変えられるところから考えてみましょう。'};
}
