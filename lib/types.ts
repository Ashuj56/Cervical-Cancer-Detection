export interface CervixAnalysisType {
  id?: string
  patientId: string
  imageUrl: string
  analysis: string
  riskLevel: "low" | "medium" | "high"
  doctorId?: string
  ashaWorkerId: string
  createdAt?: any
  doctorFeedback?: string
  nextSteps?: string
  doctorReviewAt?: any
}
