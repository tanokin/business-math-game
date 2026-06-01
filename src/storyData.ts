import defaultCharImg from './assets/char.png';

export interface QuizData {
  question: string;
  choices: string[];
  correctIndex: number;
  onCorrectNodeId: string;
  onIncorrectNodeId: string;
}

export interface BranchChoice {
  text: string;
  nextNodeId: string;
}

export interface StoryNode {
  id: string;
  speaker: string;
  message: string;
  quiz?: QuizData;
  branches?: BranchChoice[];
  nextNodeId?: string;
  bgImage?: string;
  charImage?: string;
  salaryChange?: number;
  staminaChange?: number;
  correctAnswersChange?: number;
}

export const storyScript: Record<string, StoryNode> = {
  start: {
    id: 'start',
    speaker: '先輩',
    message: '新入社員の君、入社おめでとう！まずはビジネス数字の基礎から学んでいきましょう。',
    charImage: defaultCharImg,
    nextNodeId: 'intro_2',
  },
  intro_2: {
    id: 'intro_2',
    speaker: '先輩',
    message: '会社の利益にはいくつか種類があるの。クイズの前に、何か私に質問はある？',
    branches: [
      { text: '「限界利益」って何ですか？', nextNodeId: 'ask_genkai' },
      { text: '「粗利率」って何ですか？', nextNodeId: 'ask_arari' },
      { text: '特になし、クイズをお願いします！', nextNodeId: 'quiz_1_intro' }
    ]
  },
  ask_genkai: {
    id: 'ask_genkai',
    speaker: '先輩',
    message: '限界利益は、売上高から変動費を引いたものよ。固定費を回収する力を見るのに使うわ。',
    nextNodeId: 'intro_2',
  },
  ask_arari: {
    id: 'ask_arari',
    speaker: '先輩',
    message: '粗利率は売上総利益率のことね。商品自体の利益率を測るもっとも基本的な指標よ。',
    nextNodeId: 'intro_2',
  },
  quiz_1_intro: {
    id: 'quiz_1_intro',
    speaker: '先輩',
    message: 'よろしい。それじゃあ、最初の「限界利益」についてのクイズよ！',
    nextNodeId: 'quiz_1',
  },
  quiz_1: {
    id: 'quiz_1',
    speaker: '先輩',
    message: '問題！売上高が100万円、変動費が60万円、固定費が30万円のとき、限界利益はいくらになる？',
    quiz: {
      question: '限界利益の計算',
      choices: ["10万円", "40万円", "70万円", "100万円"],
      correctIndex: 1,
      onCorrectNodeId: 'quiz_1_correct',
      onIncorrectNodeId: 'quiz_1_incorrect',
    }
  },
  quiz_1_correct: {
    id: 'quiz_1_correct',
    speaker: '先輩',
    message: '大正解！ 限界利益は「売上高 - 変動費」だから40万円ね。筋がいいわ、給料アップよ！',
    salaryChange: 10000,
    correctAnswersChange: 1,
    nextNodeId: 'quiz_2_intro',
  },
  quiz_1_incorrect: {
    id: 'quiz_1_incorrect',
    speaker: '先輩',
    message: 'うーん、残念。限界利益は「売上高 - 変動費」で計算するのよ。復習しておいてね。（体力-20）',
    staminaChange: -20,
    nextNodeId: 'quiz_2_intro',
  },
  quiz_2_intro: {
    id: 'quiz_2_intro',
    speaker: '先輩',
    message: 'それじゃあ、次の問題にいくわよ。',
    nextNodeId: 'quiz_2',
  },
  quiz_2: {
    id: 'quiz_2',
    speaker: '先輩',
    message: '「粗利率（売上総利益率）」の計算式として正しいものはどれ？',
    quiz: {
      question: '粗利率の計算',
      choices: ["(売上高 - 変動費) ÷ 売上高", "(売上総利益 ÷ 売上高) × 100", "(営業利益 ÷ 売上高) × 100", "売上高 ÷ 総資産"],
      correctIndex: 1,
      onCorrectNodeId: 'quiz_2_correct',
      onIncorrectNodeId: 'quiz_2_incorrect',
    }
  },
  quiz_2_correct: {
    id: 'quiz_2_correct',
    speaker: '先輩',
    message: 'その通り！ 粗利率は原価以外の利益の割合を示す重要な指標よ。いい調子ね！（給料UP）',
    salaryChange: 10000,
    correctAnswersChange: 1,
    nextNodeId: 'quiz_3_intro',
  },
  quiz_2_incorrect: {
    id: 'quiz_2_incorrect',
    speaker: '先輩',
    message: 'ちがうわ。「売上総利益 ÷ 売上高 × 100」が正解。しっかり覚えてね。（体力-20）',
    staminaChange: -20,
    nextNodeId: 'quiz_3_intro',
  },
  quiz_3_intro: {
    id: 'quiz_3_intro',
    speaker: '先輩',
    message: 'どんどん行くわよ。次は「損益分岐点」についてね。',
    nextNodeId: 'quiz_3',
  },
  quiz_3: {
    id: 'quiz_3',
    speaker: '先輩',
    message: '「損益分岐点売上高」を求める計算式として正しいものはどれ？',
    quiz: {
      question: '損益分岐点売上高の計算',
      choices: ["固定費 ÷ 限界利益率", "固定費 ÷ 粗利率", "変動費 ÷ 売上高", "固定費 ＋ 変動費"],
      correctIndex: 0,
      onCorrectNodeId: 'quiz_3_correct',
      onIncorrectNodeId: 'quiz_3_incorrect',
    }
  },
  quiz_3_correct: {
    id: 'quiz_3_correct',
    speaker: '先輩',
    message: '完璧！利益がちょうどゼロになる売上高のことね。赤字にならないための最低ラインよ。（給料UP）',
    salaryChange: 10000,
    correctAnswersChange: 1,
    nextNodeId: 'quiz_4_intro',
  },
  quiz_3_incorrect: {
    id: 'quiz_3_incorrect',
    speaker: '先輩',
    message: 'ブッブー。正解は「固定費 ÷ 限界利益率」よ。利益がゼロになる売上高のことだからね。（体力-20）',
    staminaChange: -20,
    nextNodeId: 'quiz_4_intro',
  },
  quiz_4_intro: {
    id: 'quiz_4_intro',
    speaker: '先輩',
    message: '少し視点を変えて、投資家が見る指標についても勉強しましょうか。',
    nextNodeId: 'quiz_4',
  },
  quiz_4: {
    id: 'quiz_4',
    speaker: '先輩',
    message: '「ROE（自己資本利益率）」を高めるための手段として間違っているものは？',
    quiz: {
      question: 'ROEを高める手段',
      choices: ["当期純利益を増やす", "自社株買いを行う", "無駄な資産を減らす", "株式を新規発行して自己資本を大幅に増やす"],
      correctIndex: 3,
      onCorrectNodeId: 'quiz_4_correct',
      onIncorrectNodeId: 'quiz_4_incorrect',
    }
  },
  quiz_4_correct: {
    id: 'quiz_4_correct',
    speaker: '先輩',
    message: '大正解！自己資本を無駄に増やすと分母が大きくなってROEは低下しちゃうの。（給料UP）',
    salaryChange: 10000,
    correctAnswersChange: 1,
    nextNodeId: 'quiz_5_intro',
  },
  quiz_4_incorrect: {
    id: 'quiz_4_incorrect',
    speaker: '先輩',
    message: '残念！自己資本（分母）を増やすと、ROE（当期純利益 ÷ 自己資本）は下がってしまうのよ。（体力-20）',
    staminaChange: -20,
    nextNodeId: 'quiz_5_intro',
  },
  quiz_5_intro: {
    id: 'quiz_5_intro',
    speaker: '先輩',
    message: 'マーケティングに関する指標もいくわよ！',
    nextNodeId: 'quiz_5',
  },
  quiz_5: {
    id: 'quiz_5',
    speaker: '先輩',
    message: '「ROI（投資収益率）」は何を測る指標？',
    quiz: {
      question: 'ROIの意味',
      choices: ["従業員の定着率", "投下した資本に対する利益の割合", "広告のクリック率", "顧客の満足度"],
      correctIndex: 1,
      onCorrectNodeId: 'quiz_5_correct',
      onIncorrectNodeId: 'quiz_5_incorrect',
    }
  },
  quiz_5_correct: {
    id: 'quiz_5_correct',
    speaker: '先輩',
    message: 'その通り！投資したコストに対してどれだけの利益が得られたかを示す超重要指標よ。（給料UP）',
    salaryChange: 10000,
    correctAnswersChange: 1,
    nextNodeId: 'quiz_6_intro',
  },
  quiz_5_incorrect: {
    id: 'quiz_5_incorrect',
    speaker: '先輩',
    message: '違うわよ！ROIはReturn On Investmentの略で、投資に対する利益の割合のこと！（体力-20）',
    staminaChange: -20,
    nextNodeId: 'quiz_6_intro',
  },
  quiz_6_intro: {
    id: 'quiz_6_intro',
    speaker: '先輩',
    message: 'さあ、だんだん難しくなるわよ。次は「営業利益」について。',
    nextNodeId: 'quiz_6',
  },
  quiz_6: {
    id: 'quiz_6',
    speaker: '先輩',
    message: '「営業利益」を求める正しい計算式は？',
    quiz: {
      question: '営業利益の計算',
      choices: ["売上総利益 － 販管費", "売上高 － 売上原価", "経常利益 ＋ 特別利益", "税引前当期純利益 － 法人税"],
      correctIndex: 0,
      onCorrectNodeId: 'quiz_6_correct',
      onIncorrectNodeId: 'quiz_6_incorrect',
    }
  },
  quiz_6_correct: {
    id: 'quiz_6_correct',
    speaker: '先輩',
    message: '素晴らしい！本業の儲けを示す営業利益は「粗利（売上総利益）から販管費を引く」のよ。（給料UP）',
    salaryChange: 10000,
    correctAnswersChange: 1,
    nextNodeId: 'quiz_7_intro',
  },
  quiz_6_incorrect: {
    id: 'quiz_6_incorrect',
    speaker: '先輩',
    message: 'ちがーう！正解は「売上総利益 － 販管費」よ。本業の儲けの基本だから覚えておいて！（体力-20）',
    staminaChange: -20,
    nextNodeId: 'quiz_7_intro',
  },
  quiz_7_intro: {
    id: 'quiz_7_intro',
    speaker: '先輩',
    message: '次はLTV（Life Time Value：顧客生涯価値）についてよ。',
    nextNodeId: 'quiz_7',
  },
  quiz_7: {
    id: 'quiz_7',
    speaker: '先輩',
    message: '一般的なLTVの計算式として、正しいものはどれ？',
    quiz: {
      question: 'LTVの計算',
      choices: ["平均顧客単価 × 収益率", "平均顧客単価 × 購買頻度 × 継続期間", "売上高 ÷ 顧客数", "新規獲得コスト × 継続期間"],
      correctIndex: 1,
      onCorrectNodeId: 'quiz_7_correct',
      onIncorrectNodeId: 'quiz_7_incorrect',
    }
  },
  quiz_7_correct: {
    id: 'quiz_7_correct',
    speaker: '先輩',
    message: '正解！一人の顧客が一生の間に会社にもたらす利益のことね。サブスク時代に必須の知識よ！（給料UP）',
    salaryChange: 10000,
    correctAnswersChange: 1,
    nextNodeId: 'quiz_8_intro',
  },
  quiz_7_incorrect: {
    id: 'quiz_7_incorrect',
    speaker: '先輩',
    message: 'うーん、惜しい。「平均顧客単価 × 購買頻度 × 継続期間」が基本の計算式よ。（体力-20）',
    staminaChange: -20,
    nextNodeId: 'quiz_8_intro',
  },
  quiz_8_intro: {
    id: 'quiz_8_intro',
    speaker: '先輩',
    message: '最後に、LTVとセットで語られるCAC（顧客獲得単価）の問題！',
    nextNodeId: 'quiz_8',
  },
  quiz_8: {
    id: 'quiz_8',
    speaker: '先輩',
    message: '健全なビジネスモデルとされる、「LTV」と「CAC」の理想的なバランスは？',
    quiz: {
      question: 'LTVとCACのバランス',
      choices: ["LTV が CAC の3倍以上", "LTV と CAC が同じ", "CAC が LTV の2倍以上", "CAC を限りなく0にする"],
      correctIndex: 0,
      onCorrectNodeId: 'quiz_8_correct',
      onIncorrectNodeId: 'quiz_8_incorrect',
    }
  },
  quiz_8_correct: {
    id: 'quiz_8_correct',
    speaker: '先輩',
    message: '完璧ね！「LTV/CAC > 3」が健全なSaaSビジネスの指標と言われているわ。（給料UP）',
    salaryChange: 10000,
    correctAnswersChange: 1,
    nextNodeId: 'end_of_game',
  },
  quiz_8_incorrect: {
    id: 'quiz_8_incorrect',
    speaker: '先輩',
    message: '不正解！一般的に「LTV は CAC の3倍以上あること」が健全と言われているわ。（体力-20）',
    staminaChange: -20,
    nextNodeId: 'end_of_game',
  },
  end_of_game: {
    id: 'end_of_game',
    speaker: '先輩',
    message: '今日の研修問題はここまで！たくさん勉強したわね、お疲れ様！また明日テストするからね！',
    nextNodeId: 'start', // loop back to start
  }
};
