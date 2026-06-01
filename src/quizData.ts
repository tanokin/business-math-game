export interface Quiz {
  id: number;
  question: string;
  choices: string[];
  correctAnswerIndex: number;
  explanation: string;
}

export const quizzes: Quiz[] = [
  {
    id: 1,
    question: "売上高が100万円、変動費が60万円、固定費が30万円のとき、限界利益はいくら？",
    choices: ["10万円", "40万円", "70万円", "100万円"],
    correctAnswerIndex: 1,
    explanation: "限界利益 ＝ 売上高 － 変動費 なので、100万円 - 60万円 = 40万円です。"
  },
  {
    id: 2,
    question: "粗利率（売上総利益率）の計算式として正しいものは？",
    choices: ["(売上高 - 変動費) ÷ 売上高", "(売上総利益 ÷ 売上高) × 100", "(営業利益 ÷ 売上高) × 100", "売上高 ÷ 総資産"],
    correctAnswerIndex: 1,
    explanation: "粗利率は「売上総利益 ÷ 売上高 × 100」で求められます。売上に対する原価以外の利益の割合です。"
  },
  {
    id: 3,
    question: "損益分岐点売上高を求める計算式は？",
    choices: ["固定費 ÷ 限界利益率", "固定費 ÷ 粗利率", "変動費 ÷ 売上高", "固定費 ＋ 変動費"],
    correctAnswerIndex: 0,
    explanation: "損益分岐点売上高は「固定費 ÷ 限界利益率」で計算できます。利益がちょうどゼロになる売上高のことです。"
  },
  {
    id: 4,
    question: "ROE（自己資本利益率）を高めるための手段として間違っているものは？",
    choices: ["当期純利益を増やす", "自社株買いを行う", "無駄な資産を減らす", "株式を新規発行して自己資本を大幅に増やす"],
    correctAnswerIndex: 3,
    explanation: "ROE ＝ 当期純利益 ÷ 自己資本 です。自己資本を無駄に増やすと分母が大きくなり、ROEは低下してしまいます。"
  },
  {
    id: 5,
    question: "「ROI（投資収益率）」は何を測る指標？",
    choices: ["従業員の定着率", "投下した資本に対する利益の割合", "広告のクリック率", "顧客の満足度"],
    correctAnswerIndex: 1,
    explanation: "ROI（Return On Investment）は、投資したコストに対してどれだけの利益が得られたかを示す指標です。"
  }
];
