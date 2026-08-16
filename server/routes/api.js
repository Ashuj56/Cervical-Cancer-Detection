const express = require("express");
const Patient = require("../models/Patient");
const User = require("../models/User");
const Hospital = require("../models/Hospital");
const Analysis = require("../models/Analysis");

const router = express.Router();

// GET all patients
router.get("/patients", async (req, res) => {
  try {
    const { ashaWorkerId } = req.query;
    const filter = ashaWorkerId ? { ashaWorkerId } : {};
    const patients = await Patient.find(filter).sort({ createdAt: -1 });
    res.json(patients);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST new patient
router.post("/patients", async (req, res) => {
  try {
    const patient = await Patient.create(req.body);
    res.status(201).json(patient);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET doctors
router.get("/doctors", async (req, res) => {
  try {
    const doctors = await User.find({ role: "doctor" }).select("-password");
    res.json(doctors);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// PUT update doctor profile
router.put("/doctors/:id", async (req, res) => {
  try {
    const doctor = await User.findByIdAndUpdate(req.params.id, req.body, { new: true }).select("-password");
    if (!doctor) {
      return res.status(404).json({ error: "Doctor not found" });
    }
    res.json(doctor);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET ASHA workers
router.get("/asha-workers", async (req, res) => {
  try {
    const ashaworkers = await User.find({ role: "aasha_worker" }).select("-password");
    res.json(ashaworkers);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// GET hospitals
router.get("/hospitals", async (req, res) => {
  try {
    const hospitals = await Hospital.find().sort({ name: 1 });
    res.json(hospitals);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST hospital
router.post("/hospitals", async (req, res) => {
  try {
    const hospital = await Hospital.create(req.body);
    res.status(201).json(hospital);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// GET analyses
router.get("/analyses", async (req, res) => {
  try {
    const { ashaWorkerId, doctorId } = req.query;
    const filter = {};
    if (ashaWorkerId) filter.ashaWorkerId = ashaWorkerId;
    if (doctorId) filter.doctorId = doctorId;

    const analyses = await Analysis.find(filter).sort({ createdAt: -1 });
    res.json(analyses);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// POST analysis
router.post("/analyses", async (req, res) => {
  try {
    const analysis = await Analysis.create(req.body);
    res.status(201).json(analysis);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

module.exports = router;
