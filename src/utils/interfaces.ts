export interface LangVariantI {
  RID: string,
  langId: "en" | "am" | "tg" | "or",
  text: string
}

export interface ShowPatternI {
  RID: string,
  IfQues: string,
  IfAns: string
}

export interface ChoiceI {
  RID: string,
  ChoiceText: LangVariantI []
}

export interface QuestionObject {
  RID: string,
  required: boolean,
  hasShowPattern: boolean,
  inputType: string,
  expectedMin?: number,
  expectedMax?: number
  QuestionText: LangVariantI [],
  Choices?: ChoiceI [],
  ShowPatterns?: ShowPatternI []
}

export interface QuestionComponent {
  number: number,
  question: QuestionObject,
  otherQuestions: QuestionObject[],
  onAction: (RID: string, ACTION: "ADD" | "DEL" | "MODIF", 
    OBJECT: "SPT" | "CHS" | "QTN" | "LNG",
    TARGET: "IFANS" | "IFQUES" | "REQ" | "HASSP" | "INPTY" | "EXMN" | "EXMX" | "LNID" | "LNTX" | "WHL",
    VALUE?: any) => void
}

export interface QuestionStorage {
  RID: string,
  required: boolean,
  hasShowPattern: boolean,
  inputType: string,
  expectedMin?: number,
  expectedMax?: number
  QuestionText: string [],
  Choices?: string [],
  ShowPatterns?: string []
}

export interface LangStorage {
  RID: string,
  langId: "en" | "am" | "tg" | "or",
  text: string
}

export interface ShowPatternStorage {
  RID: string,
  IfQues: string,
  IfAns: string
}

export interface ChoiceStorage {
  RID: string,
  Choice: string []
}

// To dynamically add properties
export interface LooseObject {
  [key: string]: any
}