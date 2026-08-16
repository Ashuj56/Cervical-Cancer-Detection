// Service functions communicating with Express + MongoDB REST API
const API_BASE = "http://localhost:5000/api"

export interface Patient {
  id?: string
  _id?: string
  patientId: string
  name: string
  age: number
  gender: string
  phone: string
  address: string
  medicalHistory: string
  ashaWorkerId: string
  email?: string
  preferredHospitalId?: string
  createdAt?: string
}

export interface Doctor {
  id?: string
  _id?: string
  name: string
  specialization: string
  phone: string
  email: string
  hospitalId?: string
  experience: string
}

export interface AshaWorker {
  id?: string
  _id?: string
  name: string
  phone: string
  address: string
  experience: string
  username: string
  email?: string
}

export interface Hospital {
  id?: string
  _id?: string
  name: string
  type: "Government" | "Private"
  city: string
  address: string
  phone: string
  doctorIds: string[]
  createdBy?: string
}

export interface CervixAnalysis {
  id?: string
  _id?: string
  patientId: string
  imageUrl: string
  analysis: string
  riskLevel: "low" | "medium" | "high"
  doctorId?: string
  ashaWorkerId: string
  doctorFeedback?: string
  nextSteps?: string
  doctorReviewAt?: any
  createdAt?: any
}

export interface Appointment {
  id?: string
  _id?: string
  patientId: string
  doctorId: string
  hospitalId: string
  date: string
  time: string
  reason?: string
  symptoms?: string
  status: "scheduled" | "completed" | "cancelled"
}

export const patientService = {
  async create(patient: Omit<Patient, "id" | "_id">) {
    const res = await fetch(`${API_BASE}/patients`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(patient),
    })
    const data = await res.json()
    return data._id || data.id
  },

  async getAll() {
    const res = await fetch(`${API_BASE}/patients`)
    const data = await res.json()
    return data.map((d: any) => ({ ...d, id: d._id })) as Patient[]
  },

  async getByAshaWorker(ashaWorkerId: string) {
    const res = await fetch(`${API_BASE}/patients?ashaWorkerId=${ashaWorkerId}`)
    const data = await res.json()
    return data.map((d: any) => ({ ...d, id: d._id })) as Patient[]
  },

  async getById(id: string) {
    const all = await this.getAll()
    return all.find((p) => p.id === id || p.patientId === id) || null
  },

  async getByPatientId(patientId: string) {
    const all = await this.getAll()
    return all.find((p) => p.patientId === patientId) || null
  },

  async update(id: string, updates: Partial<Patient>) {
    const res = await fetch(`${API_BASE}/patients/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    })
    if (!res.ok) return
    const data = await res.json()
    return { ...data, id: data._id } as Patient
  },

  async delete(id: string) {
    await fetch(`${API_BASE}/patients/${id}`, { method: "DELETE" })
  },
}

export const doctorService = {
  async getAll() {
    const res = await fetch(`${API_BASE}/doctors`)
    const data = await res.json()
    return data.map((d: any) => ({ ...d, id: d._id })) as Doctor[]
  },

  async getById(id: string) {
    const doctors = await this.getAll()
    return doctors.find((d) => d.id === id) || null
  },

  async update(id: string, updates: Partial<Doctor>) {
    const res = await fetch(`${API_BASE}/doctors/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    })
    if (!res.ok) {
      throw new Error("Failed to update doctor profile")
    }
    const data = await res.json()
    return { ...data, id: data._id } as Doctor
  },
}

export interface PatientDoctorAssignment {
  id?: string
  _id?: string
  patientId: string
  doctorId: string
  ashaWorkerId: string
  createdAt?: any
}

export const ashaWorkerService = {
  async getAll() {
    const res = await fetch(`${API_BASE}/asha-workers`)
    const data = await res.json()
    return data.map((d: any) => ({ ...d, id: d._id })) as AshaWorker[]
  },

  async getById(id: string) {
    const workers = await this.getAll()
    return workers.find((w) => w.id === id) || null
  },

  async update(id: string, updates: Partial<AshaWorker>) {
    const res = await fetch(`${API_BASE}/asha-workers/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    })
    if (!res.ok) return
    const data = await res.json()
    return { ...data, id: data._id } as AshaWorker
  },
}

export const hospitalService = {
  async create(hospital: Omit<Hospital, "id" | "_id">) {
    const res = await fetch(`${API_BASE}/hospitals`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(hospital),
    })
    const data = await res.json()
    return data._id || data.id
  },

  async getAll() {
    const res = await fetch(`${API_BASE}/hospitals`)
    const data = await res.json()
    return data.map((d: any) => ({ ...d, id: d._id })) as Hospital[]
  },
}

export const cervixAnalysisService = {
  async create(analysis: Omit<CervixAnalysis, "id" | "_id">) {
    const res = await fetch(`${API_BASE}/analyses`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(analysis),
    })
    const data = await res.json()
    return data._id || data.id
  },

  async getAll() {
    const res = await fetch(`${API_BASE}/analyses`)
    const data = await res.json()
    return data.map((d: any) => ({ ...d, id: d._id })) as CervixAnalysis[]
  },

  async getByAshaWorker(ashaWorkerId: string) {
    const res = await fetch(`${API_BASE}/analyses?ashaWorkerId=${ashaWorkerId}`)
    const data = await res.json()
    return data.map((d: any) => ({ ...d, id: d._id })) as CervixAnalysis[]
  },

  async getByDoctor(doctorId: string) {
    const res = await fetch(`${API_BASE}/analyses?doctorId=${doctorId}`)
    const data = await res.json()
    return data.map((d: any) => ({ ...d, id: d._id })) as CervixAnalysis[]
  },

  async getByPatient(patientId: string) {
    const all = await this.getAll()
    return all.filter((a) => a.patientId === patientId)
  },

  async update(id: string, updates: Partial<CervixAnalysis>) {
    const res = await fetch(`${API_BASE}/analyses/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(updates),
    })
    if (!res.ok) return
    const data = await res.json()
    return { ...data, id: data._id } as CervixAnalysis
  },
}

export const imageService = {
  async uploadCervixImage(file: Blob | File, patientId: string): Promise<string> {
    return URL.createObjectURL(file)
  },
}

export interface ChatMessage {
  id?: string
  patientId?: string
  doctorId?: string
  ashaWorkerId?: string
  senderType: "patient" | "doctor" | "ashaWorker"
  message: string
  timestamp: any
}

export const chatService = {
  async sendMessage(msg: any) {
    return "chat_" + Date.now()
  },
  async getMessages(patientId?: string, doctorId?: string, ashaWorkerId?: string): Promise<ChatMessage[]> {
    return []
  },
}

export const appointmentService = {
  async create(appt: any) {
    return "appt_" + Date.now()
  },
  async getByPatient(patientId: string): Promise<Appointment[]> {
    return []
  },
  async getByDoctor(doctorId: string): Promise<Appointment[]> {
    return []
  },
}

export const callService = {
  async getCallHistory(patientId?: string, doctorId?: string) {
    return []
  },
}

export const ashaDoctorLinkService = {
  async getDoctorsForAsha(ashaId: string) {
    return doctorService.getAll()
  },
  async linkDoctor(ashaWorkerId: string, doctorId: string) {
    return "link_" + Date.now()
  },
  async unlinkDoctor(linkId: string) {
    return
  },
}

export const assignmentService = {
  async getByAshaWorker(ashaWorkerId: string): Promise<PatientDoctorAssignment[]> {
    return []
  },
  async getByDoctor(doctorId: string): Promise<PatientDoctorAssignment[]> {
    return []
  },
  async create(assignment: any) {
    return "assign_" + Date.now()
  },
}

