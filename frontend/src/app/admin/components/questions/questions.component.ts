import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

interface AnalysisQuestion {
  question: string;
  type: string;
  category: string;
  status: string;
}

@Component({
  selector: 'app-questions',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './questions.component.html',
})
export class QuestionsComponent {

  questions: AnalysisQuestion[] = [
    {
      question: 'What is your skin type?',
      type: 'Multiple Choice',
      category: 'Skin Profile',
      status: 'Active',
    },
    {
      question: 'Do you have acne currently?',
      type: 'Yes / No',
      category: 'Skin Concerns',
      status: 'Active',
    },
    {
      question: 'Do you experience irritation or sensitivity?',
      type: 'Yes / No',
      category: 'Sensitivity',
      status: 'Active',
    },
    {
      question: 'How much water do you drink daily?',
      type: 'Multiple Choice',
      category: 'Lifestyle',
      status: 'Active',
    },
    {
      question: 'How many hours do you sleep?',
      type: 'Multiple Choice',
      category: 'Lifestyle',
      status: 'Active',
    },
    {
      question: 'Do you wear makeup frequently?',
      type: 'Yes / No',
      category: 'Habits',
      status: 'Active',
    },
    {
      question: 'What is your skincare budget?',
      type: 'Multiple Choice',
      category: 'Budget',
      status: 'Active',
    },
    {
      question: 'Do you spend a lot of time under the sun?',
      type: 'Yes / No',
      category: 'Environment',
      status: 'Active',
    },
  ];

  get totalQuestions(): number {
    return this.questions.length;
  }

  get activeQuestions(): number {
    return this.questions.filter(q => q.status === 'Active').length;
  }

  get yesNoQuestions(): number {
    return this.questions.filter(q => q.type === 'Yes / No').length;
  }

  get categoriesCount(): number {
    return new Set(this.questions.map(q => q.category)).size;
  }

  getCategoryClass(category: string): string {
    switch (category) {
      case 'Lifestyle':
        return 'bg-[#eef6ff] text-[#4f6b92]';

      case 'Skin Concerns':
        return 'bg-[#fff0f0] text-[#b05b5b]';

      case 'Skin Profile':
        return 'bg-[#f4f1ff] text-[#6d5ca8]';

      case 'Budget':
        return 'bg-[#fef6e8] text-[#a47b2d]';

      default:
        return 'bg-[#f6ece8] text-[#8f6153]';
    }
  }
}