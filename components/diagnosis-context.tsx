'use client';
import {createContext,useContext,useState,type ReactNode} from 'react';
import type {Answers} from '@/lib/calculation';
const Context=createContext<{answers:Answers|null;setAnswers:(a:Answers|null)=>void}|null>(null);
export function DiagnosisProvider({children}:{children:ReactNode}){const [answers,setAnswers]=useState<Answers|null>(null);return <Context.Provider value={{answers,setAnswers}}>{children}</Context.Provider>;}
export function useDiagnosis(){const ctx=useContext(Context);if(!ctx)throw new Error('Provider missing');return ctx;}
