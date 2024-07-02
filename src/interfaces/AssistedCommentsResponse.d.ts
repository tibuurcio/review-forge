export interface AssistedCommentsResponse {
  summary: string; // Small summary of the changes in this PR. No more than one paragraph.
  orderingReason: string; // Explanation of the reasoning behind the file order that should be followed
  files: Array<{
    // oldPath: string;
    // newPath: string;
    diffFile: string;
    comments: Array<{
      lineNumber: number;
      comment: string;
      type: 'code-readability' | 'performance-improvements' | 'tests' | 'security' | 'suggestion';
    }>
  }>;
}
