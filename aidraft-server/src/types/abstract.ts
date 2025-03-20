import { SummaryType } from './enums';

export abstract class GenerativeAIService {
  abstract generateSummary(
    note: string,
    type: SummaryType,
    customInstructions?: string,
  ): Promise<string>;

  protected formatPrompt(
    note: string,
    type: SummaryType,
    customInstructions?: string,
  ): string {
    return `I need a ${type} summary of a whole note content. The summary should be professional and align with the original content.
      The note content is as follows: ${note}

      Group the content into related topics, and use subtitles when there are too many topics on the same note. This will be displayed in a AI-generated summary, so make sure it is clear and concise.
      ${customInstructions && customInstructions.length ? `Consider these specific instructions: ${customInstructions}` : ''}
      Please provide the summary below:`;
  }
}
