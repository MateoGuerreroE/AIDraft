import { Injectable } from '@nestjs/common';
import { GenerativeAIService, SummaryType } from 'src/types';
import { GoogleGenerativeAI } from '@google/generative-ai';
import { ConfigService } from './Config.service';

@Injectable()
export class GeminiService extends GenerativeAIService {
  private genAI: GoogleGenerativeAI;

  constructor(private readonly configService: ConfigService) {
    super();
    this.genAI = new GoogleGenerativeAI(this.configService.getGeminiKey());
  }

  async generateSummary(note: string, type: SummaryType): Promise<string> {
    const prompt = this.formatPrompt(note, type);
    const model = this.genAI.getGenerativeModel({ model: 'gemini-1.5-flash' });
    try {
      const result = await model.generateContent(prompt);
      return result.response.text();
    } catch (e) {
      console.log('ERROR: ', e);
      throw new Error('Error generating text');
    }
  }
}
