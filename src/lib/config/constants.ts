export const Constants = {
  dateFormat: "d MMMM y",
  ApiBseURL: `${process.env.NEXT_PUBLIC_BASE_API_URL}/api`,
  FileBseURL: `${process.env.NEXT_PUBLIC_BASE_FILE_URL}/api`,
  WebsiteBaseURL: `${process.env.NEXT_PUBLIC_BASE_SITE_URL}`,
  WebsiteName: "ماترک",
  SessionName: "matarak-session",
  PublicSessionName: "matarak-session-public",
} as const;

export enum Hash {
  datePicker = "#datePicker",
}
