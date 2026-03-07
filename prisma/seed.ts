import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

const projects = [
  // 1. FMCG - New Product Launch
  {
    name: "FMCG Product Launch - Energy Drink",
    description: "Launch of new energy drink brand across 5 regions with marketing campaign and distribution setup",
    startDate: "2026-01-06",
    endDate: "2026-08-31",
    tasks: [
      { id: "f1", name: "Market Research & Consumer Analysis", startDate: "2026-01-06", endDate: "2026-01-31", progress: 100, category: "planning", assignee: "Sarah Mitchell", dependencies: [] },
      { id: "f2", name: "Product Formulation & Testing", startDate: "2026-01-20", endDate: "2026-03-15", progress: 85, category: "development", assignee: "Dr. James Chen", dependencies: ["f1"] },
      { id: "f3", name: "Packaging Design & Prototyping", startDate: "2026-02-01", endDate: "2026-03-01", progress: 90, category: "design", assignee: "Emma Rodriguez", dependencies: ["f1"] },
      { id: "f4", name: "Regulatory Compliance & FDA Approval", startDate: "2026-03-01", endDate: "2026-04-30", progress: 60, category: "planning", assignee: "Michael Brown", dependencies: ["f2"] },
      { id: "f5", name: "Manufacturing Line Setup", startDate: "2026-03-15", endDate: "2026-05-15", progress: 45, category: "development", assignee: "Robert Taylor", dependencies: ["f2", "f3"] },
      { id: "f6", name: "Supplier Agreements & Raw Material Sourcing", startDate: "2026-02-15", endDate: "2026-04-01", progress: 80, category: "planning", assignee: "Lisa Anderson", dependencies: ["f2"] },
      { id: "f7", name: "Brand Identity Development", startDate: "2026-02-01", endDate: "2026-03-15", progress: 95, category: "design", assignee: "David Kim", dependencies: ["f1"] },
      { id: "f8", name: "Marketing Strategy & Campaign Planning", startDate: "2026-03-01", endDate: "2026-04-15", progress: 70, category: "planning", assignee: "Jennifer White", dependencies: ["f7"] },
      { id: "f9", name: "Digital Marketing Setup", startDate: "2026-04-01", endDate: "2026-05-01", progress: 55, category: "marketing", assignee: "Chris Lee", dependencies: ["f8"] },
      { id: "f10", name: "TV & Print Media Campaign Production", startDate: "2026-04-15", endDate: "2026-06-01", progress: 30, category: "marketing", assignee: "Amanda Garcia", dependencies: ["f8"] },
      { id: "f11", name: "Distribution Network Setup - North Region", startDate: "2026-05-01", endDate: "2026-06-15", progress: 25, category: "development", assignee: "Kevin Johnson", dependencies: ["f5"] },
      { id: "f12", name: "Distribution Network Setup - South Region", startDate: "2026-05-01", endDate: "2026-06-15", progress: 25, category: "development", assignee: "Michelle Davis", dependencies: ["f5"] },
      { id: "f13", name: "Distribution Network Setup - East Region", startDate: "2026-05-15", endDate: "2026-06-30", progress: 20, category: "development", assignee: "Brian Wilson", dependencies: ["f5"] },
      { id: "f14", name: "Distribution Network Setup - West Region", startDate: "2026-05-15", endDate: "2026-06-30", progress: 20, category: "development", assignee: "Stephanie Moore", dependencies: ["f5"] },
      { id: "f15", name: "Retail Partner Onboarding", startDate: "2026-06-01", endDate: "2026-07-15", progress: 15, category: "planning", assignee: "Daniel Martinez", dependencies: ["f11", "f12", "f13", "f14"] },
      { id: "f16", name: "Sales Team Training", startDate: "2026-06-15", endDate: "2026-07-15", progress: 10, category: "planning", assignee: "Rachel Thompson", dependencies: ["f8"] },
      { id: "f17", name: "Quality Assurance Testing - Production Batch", startDate: "2026-05-15", endDate: "2026-06-30", progress: 35, category: "testing", assignee: "Dr. James Chen", dependencies: ["f5"] },
      { id: "f18", name: "Pre-Launch Marketing Teaser Campaign", startDate: "2026-07-01", endDate: "2026-07-31", progress: 0, category: "marketing", assignee: "Chris Lee", dependencies: ["f9", "f10"] },
      { id: "f19", name: "Launch Event Planning", startDate: "2026-07-01", endDate: "2026-08-15", progress: 0, category: "planning", assignee: "Jennifer White", dependencies: ["f15"] },
      { id: "f20", name: "Official Product Launch", startDate: "2026-08-20", endDate: "2026-08-31", progress: 0, category: "deployment", assignee: "Sarah Mitchell", dependencies: ["f17", "f18", "f19"] },
    ]
  },

  // 2. Construction - Commercial Building
  {
    name: "Commercial Complex Construction - Downtown Plaza",
    description: "Multi-story commercial complex with retail spaces, offices, and parking facility",
    startDate: "2026-01-05",
    endDate: "2027-06-30",
    tasks: [
      { id: "c1", name: "Land Acquisition & Legal Documentation", startDate: "2026-01-05", endDate: "2026-02-28", progress: 100, category: "planning", assignee: "Thomas Wright", dependencies: [] },
      { id: "c2", name: "Architectural Design & Blueprint", startDate: "2026-02-01", endDate: "2026-04-30", progress: 85, category: "design", assignee: "Architect Sandra Lee", dependencies: ["c1"] },
      { id: "c3", name: "Environmental Impact Assessment", startDate: "2026-02-15", endDate: "2026-04-01", progress: 100, category: "planning", assignee: "Environmental Team", dependencies: ["c1"] },
      { id: "c4", name: "Building Permits & Regulatory Approvals", startDate: "2026-04-01", endDate: "2026-06-30", progress: 70, category: "planning", assignee: "Legal Department", dependencies: ["c2", "c3"] },
      { id: "c5", name: "Structural Engineering Design", startDate: "2026-03-15", endDate: "2026-05-31", progress: 90, category: "design", assignee: "Engineer Mark Johnson", dependencies: ["c2"] },
      { id: "c6", name: "MEP Systems Design", startDate: "2026-04-01", endDate: "2026-06-15", progress: 75, category: "design", assignee: "MEP Team", dependencies: ["c2"] },
      { id: "c7", name: "Contractor Bidding & Selection", startDate: "2026-05-01", endDate: "2026-06-30", progress: 60, category: "planning", assignee: "Procurement Team", dependencies: ["c5", "c6"] },
      { id: "c8", name: "Site Preparation & Excavation", startDate: "2026-07-01", endDate: "2026-08-31", progress: 40, category: "development", assignee: "Construction Team A", dependencies: ["c4", "c7"] },
      { id: "c9", name: "Foundation Work", startDate: "2026-08-15", endDate: "2026-10-31", progress: 25, category: "development", assignee: "Foundation Crew", dependencies: ["c8"] },
      { id: "c10", name: "Structural Steel & Concrete Framework - Phase 1", startDate: "2026-10-01", endDate: "2026-12-31", progress: 10, category: "development", assignee: "Construction Team A", dependencies: ["c9"] },
      { id: "c11", name: "Structural Steel & Concrete Framework - Phase 2", startDate: "2027-01-01", endDate: "2027-03-31", progress: 0, category: "development", assignee: "Construction Team A", dependencies: ["c10"] },
      { id: "c12", name: "External Facade & Cladding", startDate: "2027-02-01", endDate: "2027-05-31", progress: 0, category: "development", assignee: "Facade Team", dependencies: ["c10"] },
      { id: "c13", name: "MEP Installation - Electrical", startDate: "2027-01-15", endDate: "2027-04-30", progress: 0, category: "development", assignee: "Electrical Team", dependencies: ["c10"] },
      { id: "c14", name: "MEP Installation - Plumbing & HVAC", startDate: "2027-01-15", endDate: "2027-04-30", progress: 0, category: "development", assignee: "Plumbing Team", dependencies: ["c10"] },
      { id: "c15", name: "Fire Safety Systems Installation", startDate: "2027-03-01", endDate: "2027-05-15", progress: 0, category: "development", assignee: "Fire Safety Team", dependencies: ["c13", "c14"] },
      { id: "c16", name: "Interior Fit-Out - Common Areas", startDate: "2027-04-01", endDate: "2027-06-15", progress: 0, category: "development", assignee: "Interior Team", dependencies: ["c12"] },
      { id: "c17", name: "Parking Facility Construction", startDate: "2027-01-01", endDate: "2027-05-31", progress: 0, category: "development", assignee: "Construction Team B", dependencies: ["c9"] },
      { id: "c18", name: "Landscape & External Works", startDate: "2027-05-01", endDate: "2027-06-15", progress: 0, category: "development", assignee: "Landscape Team", dependencies: ["c12", "c17"] },
      { id: "c19", name: "Final Inspections & Certifications", startDate: "2027-06-01", endDate: "2027-06-20", progress: 0, category: "testing", assignee: "QA Team", dependencies: ["c15", "c16", "c18"] },
      { id: "c20", name: "Handover & Documentation", startDate: "2027-06-20", endDate: "2027-06-30", progress: 0, category: "deployment", assignee: "Project Manager", dependencies: ["c19"] },
    ]
  },

  // 3. Real Estate - Residential Township
  {
    name: "Residential Township Development - Green Valley",
    description: "Integrated township with 500 residential units, amenities, school, and shopping complex",
    startDate: "2026-01-05",
    endDate: "2029-12-31",
    tasks: [
      { id: "r1", name: "Land Acquisition (500 acres)", startDate: "2026-01-05", endDate: "2026-06-30", progress: 100, category: "planning", assignee: "Legal Team", dependencies: [] },
      { id: "r2", name: "Master Planning & Zoning", startDate: "2026-03-01", endDate: "2026-08-31", progress: 80, category: "planning", assignee: "Urban Planning Team", dependencies: ["r1"] },
      { id: "r3", name: "Environmental Clearance", startDate: "2026-05-01", endDate: "2026-10-31", progress: 65, category: "planning", assignee: "Environmental Consultant", dependencies: ["r1"] },
      { id: "r4", name: "Infrastructure Design - Roads & Utilities", startDate: "2026-06-01", endDate: "2026-11-30", progress: 50, category: "design", assignee: "Infrastructure Team", dependencies: ["r2"] },
      { id: "r5", name: "Residential Unit Design - Phase 1 (200 units)", startDate: "2026-07-01", endDate: "2026-12-31", progress: 40, category: "design", assignee: "Architecture Team", dependencies: ["r2"] },
      { id: "r6", name: "Amenities Design - Club & Sports Complex", startDate: "2026-08-01", endDate: "2027-01-31", progress: 30, category: "design", assignee: "Architecture Team", dependencies: ["r2"] },
      { id: "r7", name: "School Complex Design", startDate: "2026-09-01", endDate: "2027-02-28", progress: 20, category: "design", assignee: "Education Design Team", dependencies: ["r2"] },
      { id: "r8", name: "Shopping Complex Design", startDate: "2026-09-01", endDate: "2027-02-28", progress: 20, category: "design", assignee: "Commercial Design Team", dependencies: ["r2"] },
      { id: "r9", name: "Project Financing & Investment", startDate: "2026-04-01", endDate: "2026-09-30", progress: 75, category: "planning", assignee: "Finance Team", dependencies: ["r1"] },
      { id: "r10", name: "Main Infrastructure Development", startDate: "2027-01-01", endDate: "2027-12-31", progress: 10, category: "development", assignee: "Infrastructure Contractor", dependencies: ["r3", "r4"] },
      { id: "r11", name: "Residential Construction Phase 1", startDate: "2027-04-01", endDate: "2028-06-30", progress: 5, category: "development", assignee: "Construction Team A", dependencies: ["r5", "r10"] },
      { id: "r12", name: "Residential Construction Phase 2 (200 units)", startDate: "2027-10-01", endDate: "2028-12-31", progress: 0, category: "development", assignee: "Construction Team B", dependencies: ["r10"] },
      { id: "r13", name: "Residential Construction Phase 3 (100 units)", startDate: "2028-04-01", endDate: "2029-06-30", progress: 0, category: "development", assignee: "Construction Team C", dependencies: ["r10"] },
      { id: "r14", name: "Club & Sports Complex Construction", startDate: "2027-07-01", endDate: "2028-06-30", progress: 0, category: "development", assignee: "Amenities Contractor", dependencies: ["r6", "r10"] },
      { id: "r15", name: "School Construction", startDate: "2027-10-01", endDate: "2028-12-31", progress: 0, category: "development", assignee: "Education Contractor", dependencies: ["r7", "r10"] },
      { id: "r16", name: "Shopping Complex Construction", startDate: "2028-01-01", endDate: "2029-06-30", progress: 0, category: "development", assignee: "Commercial Contractor", dependencies: ["r8", "r10"] },
      { id: "r17", name: "Landscaping & Parks Development", startDate: "2028-07-01", endDate: "2029-06-30", progress: 0, category: "development", assignee: "Landscape Team", dependencies: ["r11", "r12"] },
      { id: "r18", name: "Marketing & Pre-Sales", startDate: "2027-01-01", endDate: "2028-12-31", progress: 15, category: "marketing", assignee: "Sales Team", dependencies: ["r5"] },
      { id: "r19", name: "Quality Inspections & Handovers", startDate: "2028-04-01", endDate: "2029-12-31", progress: 0, category: "testing", assignee: "QA Team", dependencies: ["r11", "r12", "r13"] },
      { id: "r20", name: "Final Handover & Community Setup", startDate: "2029-10-01", endDate: "2029-12-31", progress: 0, category: "deployment", assignee: "Project Director", dependencies: ["r14", "r15", "r16", "r17", "r19"] },
    ]
  },

  // 4. Garments - Apparel Manufacturing Setup
  {
    name: "Garment Factory Setup & Production Line",
    description: "Establishing a modern garment manufacturing facility with automated production lines",
    startDate: "2026-01-05",
    endDate: "2026-10-31",
    tasks: [
      { id: "g1", name: "Factory Site Selection & Lease Agreement", startDate: "2026-01-05", endDate: "2026-02-15", progress: 100, category: "planning", assignee: "Facilities Team", dependencies: [] },
      { id: "g2", name: "Factory Layout Design & Workflow Planning", startDate: "2026-02-01", endDate: "2026-03-15", progress: 90, category: "design", assignee: "Industrial Engineer", dependencies: ["g1"] },
      { id: "g3", name: "Machinery Procurement - Cutting Section", startDate: "2026-02-15", endDate: "2026-04-30", progress: 80, category: "planning", assignee: "Procurement Team", dependencies: ["g2"] },
      { id: "g4", name: "Machinery Procurement - Sewing Section", startDate: "2026-02-15", endDate: "2026-04-30", progress: 75, category: "planning", assignee: "Procurement Team", dependencies: ["g2"] },
      { id: "g5", name: "Machinery Procurement - Finishing Section", startDate: "2026-03-01", endDate: "2026-05-15", progress: 70, category: "planning", assignee: "Procurement Team", dependencies: ["g2"] },
      { id: "g6", name: "Factory Renovation & Setup", startDate: "2026-03-01", endDate: "2026-05-31", progress: 60, category: "development", assignee: "Construction Team", dependencies: ["g2"] },
      { id: "g7", name: "Electrical & Power Infrastructure", startDate: "2026-03-15", endDate: "2026-05-15", progress: 65, category: "development", assignee: "Electrical Team", dependencies: ["g2"] },
      { id: "g8", name: "Machinery Installation - Cutting", startDate: "2026-05-01", endDate: "2026-06-15", progress: 45, category: "development", assignee: "Technical Team", dependencies: ["g3", "g6"] },
      { id: "g9", name: "Machinery Installation - Sewing", startDate: "2026-05-15", endDate: "2026-06-30", progress: 40, category: "development", assignee: "Technical Team", dependencies: ["g4", "g6"] },
      { id: "g10", name: "Machinery Installation - Finishing", startDate: "2026-06-01", endDate: "2026-07-15", progress: 35, category: "development", assignee: "Technical Team", dependencies: ["g5", "g6"] },
      { id: "g11", name: "Quality Control Lab Setup", startDate: "2026-05-15", endDate: "2026-07-15", progress: 30, category: "development", assignee: "QC Team", dependencies: ["g6"] },
      { id: "g12", name: "ERP System Implementation", startDate: "2026-04-01", endDate: "2026-07-31", progress: 50, category: "development", assignee: "IT Team", dependencies: ["g2"] },
      { id: "g13", name: "Compliance Certification Setup", startDate: "2026-06-01", endDate: "2026-08-31", progress: 25, category: "planning", assignee: "Compliance Team", dependencies: ["g8", "g9", "g10"] },
      { id: "g14", name: "Worker Recruitment", startDate: "2026-05-01", endDate: "2026-07-31", progress: 55, category: "planning", assignee: "HR Team", dependencies: ["g2"] },
      { id: "g15", name: "Worker Training - Cutting Section", startDate: "2026-07-01", endDate: "2026-08-15", progress: 20, category: "planning", assignee: "Training Team", dependencies: ["g8", "g14"] },
      { id: "g16", name: "Worker Training - Sewing Section", startDate: "2026-07-15", endDate: "2026-08-31", progress: 15, category: "planning", assignee: "Training Team", dependencies: ["g9", "g14"] },
      { id: "g17", name: "Worker Training - Finishing Section", startDate: "2026-08-01", endDate: "2026-09-15", progress: 10, category: "planning", assignee: "Training Team", dependencies: ["g10", "g14"] },
      { id: "g18", name: "Trial Production Run", startDate: "2026-09-01", endDate: "2026-10-15", progress: 0, category: "testing", assignee: "Production Team", dependencies: ["g15", "g16", "g17"] },
      { id: "g19", name: "Quality Audit & Process Optimization", startDate: "2026-10-01", endDate: "2026-10-25", progress: 0, category: "testing", assignee: "QC Team", dependencies: ["g18"] },
      { id: "g20", name: "Full Production Launch", startDate: "2026-10-26", endDate: "2026-10-31", progress: 0, category: "deployment", assignee: "Factory Manager", dependencies: ["g13", "g19"] },
    ]
  },

  // 5. Pharmaceutical - Drug Development
  {
    name: "Pharmaceutical Drug Development - Cardiac Treatment",
    description: "Development and clinical trials of new cardiac treatment drug from research to market",
    startDate: "2026-01-05",
    endDate: "2030-12-31",
    tasks: [
      { id: "p1", name: "Drug Discovery & Initial Research", startDate: "2026-01-05", endDate: "2026-12-31", progress: 75, category: "development", assignee: "R&D Team", dependencies: [] },
      { id: "p2", name: "Pre-Clinical Studies", startDate: "2027-01-01", endDate: "2027-12-31", progress: 30, category: "development", assignee: "Research Scientists", dependencies: ["p1"] },
      { id: "p3", name: "IND Application Preparation", startDate: "2027-07-01", endDate: "2028-03-31", progress: 15, category: "planning", assignee: "Regulatory Team", dependencies: ["p2"] },
      { id: "p4", name: "Phase I Clinical Trial Design", startDate: "2027-10-01", endDate: "2028-06-30", progress: 10, category: "planning", assignee: "Clinical Team", dependencies: ["p2"] },
      { id: "p5", name: "FDA IND Submission & Approval", startDate: "2028-04-01", endDate: "2028-09-30", progress: 0, category: "planning", assignee: "Regulatory Team", dependencies: ["p3"] },
      { id: "p6", name: "Phase I Clinical Trials", startDate: "2028-10-01", endDate: "2029-03-31", progress: 0, category: "testing", assignee: "Clinical Team", dependencies: ["p4", "p5"] },
      { id: "p7", name: "Phase II Clinical Trial Design", startDate: "2028-12-01", endDate: "2029-06-30", progress: 0, category: "planning", assignee: "Clinical Team", dependencies: ["p4"] },
      { id: "p8", name: "Phase II Clinical Trials", startDate: "2029-04-01", endDate: "2029-12-31", progress: 0, category: "testing", assignee: "Clinical Team", dependencies: ["p6", "p7"] },
      { id: "p9", name: "Manufacturing Process Development", startDate: "2027-06-01", endDate: "2029-06-30", progress: 20, category: "development", assignee: "Manufacturing Team", dependencies: ["p1"] },
      { id: "p10", name: "Phase III Clinical Trial Design", startDate: "2029-06-01", endDate: "2030-02-28", progress: 0, category: "planning", assignee: "Clinical Team", dependencies: ["p7"] },
      { id: "p11", name: "Phase III Clinical Trials", startDate: "2030-01-01", endDate: "2030-09-30", progress: 0, category: "testing", assignee: "Clinical Team", dependencies: ["p8", "p10"] },
      { id: "p12", name: "Drug Safety Analysis", startDate: "2030-07-01", endDate: "2030-10-31", progress: 0, category: "testing", assignee: "Safety Team", dependencies: ["p11"] },
      { id: "p13", name: "NDA Application Preparation", startDate: "2030-08-01", endDate: "2030-11-30", progress: 0, category: "planning", assignee: "Regulatory Team", dependencies: ["p9", "p12"] },
      { id: "p14", name: "Manufacturing Scale-Up", startDate: "2029-07-01", endDate: "2030-06-30", progress: 0, category: "development", assignee: "Manufacturing Team", dependencies: ["p9"] },
      { id: "p15", name: "Packaging Design & Development", startDate: "2030-04-01", endDate: "2030-08-31", progress: 0, category: "design", assignee: "Packaging Team", dependencies: ["p9"] },
      { id: "p16", name: "FDA NDA Submission", startDate: "2030-12-01", endDate: "2030-12-31", progress: 0, category: "planning", assignee: "Regulatory Team", dependencies: ["p13"] },
      { id: "p17", name: "Marketing Strategy Development", startDate: "2030-01-01", endDate: "2030-09-30", progress: 0, category: "marketing", assignee: "Marketing Team", dependencies: ["p8"] },
      { id: "p18", name: "Sales Team Training", startDate: "2030-10-01", endDate: "2030-12-31", progress: 0, category: "planning", assignee: "Training Team", dependencies: ["p17"] },
      { id: "p19", name: "Distribution Network Setup", startDate: "2030-07-01", endDate: "2030-12-31", progress: 0, category: "development", assignee: "Distribution Team", dependencies: ["p14"] },
      { id: "p20", name: "Market Launch Preparation", startDate: "2030-10-01", endDate: "2030-12-31", progress: 0, category: "deployment", assignee: "Launch Team", dependencies: ["p16", "p17", "p18", "p19"] },
    ]
  },

  // 6. Hospital - Healthcare Facility Setup
  {
    name: "Multi-Specialty Hospital Setup",
    description: "Establishment of 300-bed multi-specialty hospital with advanced medical equipment",
    startDate: "2026-01-05",
    endDate: "2027-06-30",
    tasks: [
      { id: "h1", name: "Hospital Licensing & Regulatory Approvals", startDate: "2026-01-05", endDate: "2026-04-30", progress: 100, category: "planning", assignee: "Legal Team", dependencies: [] },
      { id: "h2", name: "Architectural Design - Clinical Areas", startDate: "2026-02-01", endDate: "2026-05-31", progress: 90, category: "design", assignee: "Healthcare Architect", dependencies: ["h1"] },
      { id: "h3", name: "Architectural Design - Support Areas", startDate: "2026-03-01", endDate: "2026-06-30", progress: 80, category: "design", assignee: "Architecture Team", dependencies: ["h1"] },
      { id: "h4", name: "Medical Equipment Procurement Planning", startDate: "2026-02-15", endDate: "2026-05-31", progress: 85, category: "planning", assignee: "Procurement Team", dependencies: ["h1"] },
      { id: "h5", name: "Construction - Main Building", startDate: "2026-04-01", endDate: "2026-12-31", progress: 50, category: "development", assignee: "Construction Team", dependencies: ["h2"] },
      { id: "h6", name: "Construction - OPD Block", startDate: "2026-05-01", endDate: "2026-11-30", progress: 45, category: "development", assignee: "Construction Team", dependencies: ["h2"] },
      { id: "h7", name: "Construction - Emergency & Trauma", startDate: "2026-05-15", endDate: "2026-12-31", progress: 40, category: "development", assignee: "Construction Team", dependencies: ["h2"] },
      { id: "h8", name: "Construction - ICU & Critical Care", startDate: "2026-06-01", endDate: "2027-01-31", progress: 35, category: "development", assignee: "Specialized Team", dependencies: ["h2"] },
      { id: "h9", name: "Construction - Operation Theaters", startDate: "2026-06-15", endDate: "2027-02-28", progress: 30, category: "development", assignee: "OT Specialist Team", dependencies: ["h2"] },
      { id: "h10", name: "Construction - Diagnostic Center", startDate: "2026-07-01", endDate: "2027-02-28", progress: 25, category: "development", assignee: "Construction Team", dependencies: ["h3"] },
      { id: "h11", name: "Medical Gas & HVAC Systems", startDate: "2026-08-01", endDate: "2027-01-31", progress: 30, category: "development", assignee: "MEP Team", dependencies: ["h5"] },
      { id: "h12", name: "Medical Equipment Installation - Phase 1", startDate: "2026-11-01", endDate: "2027-02-28", progress: 15, category: "development", assignee: "Equipment Team", dependencies: ["h6", "h7"] },
      { id: "h13", name: "Medical Equipment Installation - Phase 2", startDate: "2027-01-01", endDate: "2027-04-30", progress: 5, category: "development", assignee: "Equipment Team", dependencies: ["h8", "h9", "h10"] },
      { id: "h14", name: "Hospital Information System Implementation", startDate: "2026-06-01", endDate: "2027-03-31", progress: 40, category: "development", assignee: "IT Team", dependencies: ["h2"] },
      { id: "h15", name: "Medical Staff Recruitment", startDate: "2026-08-01", endDate: "2027-03-31", progress: 30, category: "planning", assignee: "HR Team", dependencies: ["h1"] },
      { id: "h16", name: "Nursing Staff Recruitment", startDate: "2026-09-01", endDate: "2027-04-30", progress: 25, category: "planning", assignee: "HR Team", dependencies: ["h1"] },
      { id: "h17", name: "Staff Training & Orientation", startDate: "2027-03-01", endDate: "2027-05-31", progress: 0, category: "planning", assignee: "Training Team", dependencies: ["h15", "h16"] },
      { id: "h18", name: "Equipment Calibration & Testing", startDate: "2027-04-01", endDate: "2027-05-31", progress: 0, category: "testing", assignee: "QC Team", dependencies: ["h12", "h13"] },
      { id: "h19", name: "Regulatory Inspections & Certifications", startDate: "2027-05-01", endDate: "2027-06-15", progress: 0, category: "testing", assignee: "Compliance Team", dependencies: ["h18", "h14"] },
      { id: "h20", name: "Soft Launch & Full Operations", startDate: "2027-06-15", endDate: "2027-06-30", progress: 0, category: "deployment", assignee: "Hospital Director", dependencies: ["h17", "h19"] },
    ]
  },

  // 7. IT - Enterprise Software Development
  {
    name: "Enterprise Resource Planning System",
    description: "Development of comprehensive ERP system for manufacturing company",
    startDate: "2026-01-05",
    endDate: "2027-03-31",
    tasks: [
      { id: "i1", name: "Requirements Gathering & Analysis", startDate: "2026-01-05", endDate: "2026-02-28", progress: 100, category: "planning", assignee: "Business Analyst Team", dependencies: [] },
      { id: "i2", name: "System Architecture Design", startDate: "2026-02-15", endDate: "2026-04-15", progress: 95, category: "design", assignee: "Solution Architect", dependencies: ["i1"] },
      { id: "i3", name: "Database Design & Setup", startDate: "2026-03-15", endDate: "2026-05-15", progress: 90, category: "design", assignee: "Database Team", dependencies: ["i2"] },
      { id: "i4", name: "UI/UX Design", startDate: "2026-03-01", endDate: "2026-05-31", progress: 85, category: "design", assignee: "Design Team", dependencies: ["i1"] },
      { id: "i5", name: "Finance Module Development", startDate: "2026-04-01", endDate: "2026-08-31", progress: 60, category: "development", assignee: "Dev Team A", dependencies: ["i2", "i3"] },
      { id: "i6", name: "Inventory Module Development", startDate: "2026-04-15", endDate: "2026-09-30", progress: 55, category: "development", assignee: "Dev Team B", dependencies: ["i2", "i3"] },
      { id: "i7", name: "Production Module Development", startDate: "2026-05-01", endDate: "2026-10-31", progress: 50, category: "development", assignee: "Dev Team C", dependencies: ["i2", "i3"] },
      { id: "i8", name: "HR & Payroll Module Development", startDate: "2026-05-15", endDate: "2026-10-31", progress: 45, category: "development", assignee: "Dev Team D", dependencies: ["i2", "i3"] },
      { id: "i9", name: "Sales & CRM Module Development", startDate: "2026-06-01", endDate: "2026-11-30", progress: 40, category: "development", assignee: "Dev Team E", dependencies: ["i2", "i3"] },
      { id: "i10", name: "Procurement Module Development", startDate: "2026-06-15", endDate: "2026-11-30", progress: 35, category: "development", assignee: "Dev Team F", dependencies: ["i2", "i3"] },
      { id: "i11", name: "API Development & Integration Layer", startDate: "2026-07-01", endDate: "2026-12-31", progress: 30, category: "development", assignee: "API Team", dependencies: ["i5", "i6", "i7"] },
      { id: "i12", name: "Security Implementation", startDate: "2026-08-01", endDate: "2026-12-31", progress: 25, category: "development", assignee: "Security Team", dependencies: ["i2"] },
      { id: "i13", name: "Module Integration Testing", startDate: "2026-09-01", endDate: "2027-01-31", progress: 15, category: "testing", assignee: "QA Team", dependencies: ["i5", "i6", "i7", "i8", "i9", "i10"] },
      { id: "i14", name: "Performance Testing & Optimization", startDate: "2026-11-01", endDate: "2027-01-31", progress: 10, category: "testing", assignee: "Performance Team", dependencies: ["i11"] },
      { id: "i15", name: "Security Testing & Audit", startDate: "2026-12-01", endDate: "2027-01-31", progress: 5, category: "testing", assignee: "Security Team", dependencies: ["i12"] },
      { id: "i16", name: "User Acceptance Testing", startDate: "2027-01-01", endDate: "2027-02-28", progress: 0, category: "testing", assignee: "Client Team", dependencies: ["i13", "i14", "i15"] },
      { id: "i17", name: "User Training & Documentation", startDate: "2027-01-15", endDate: "2027-03-15", progress: 0, category: "planning", assignee: "Training Team", dependencies: ["i4"] },
      { id: "i18", name: "Data Migration", startDate: "2027-02-01", endDate: "2027-03-15", progress: 0, category: "development", assignee: "Migration Team", dependencies: ["i16"] },
      { id: "i19", name: "Production Deployment", startDate: "2027-03-15", endDate: "2027-03-25", progress: 0, category: "deployment", assignee: "DevOps Team", dependencies: ["i16", "i18"] },
      { id: "i20", name: "Post-Go-Live Support", startDate: "2027-03-25", endDate: "2027-03-31", progress: 0, category: "deployment", assignee: "Support Team", dependencies: ["i19"] },
    ]
  },

  // 8. E-commerce Platform
  {
    name: "E-commerce Marketplace Platform",
    description: "Building a multi-vendor e-commerce marketplace with mobile apps",
    startDate: "2026-01-05",
    endDate: "2026-10-31",
    tasks: [
      { id: "e1", name: "Market Research & Feature Planning", startDate: "2026-01-05", endDate: "2026-02-15", progress: 100, category: "planning", assignee: "Product Team", dependencies: [] },
      { id: "e2", name: "Platform Architecture Design", startDate: "2026-02-01", endDate: "2026-03-15", progress: 95, category: "design", assignee: "Tech Architect", dependencies: ["e1"] },
      { id: "e3", name: "UI/UX Design - Web Platform", startDate: "2026-02-15", endDate: "2026-04-30", progress: 85, category: "design", assignee: "Design Team", dependencies: ["e1"] },
      { id: "e4", name: "UI/UX Design - Mobile Apps", startDate: "2026-03-01", endDate: "2026-05-15", progress: 80, category: "design", assignee: "Mobile Design Team", dependencies: ["e1"] },
      { id: "e5", name: "Backend API Development", startDate: "2026-03-15", endDate: "2026-07-31", progress: 60, category: "development", assignee: "Backend Team", dependencies: ["e2"] },
      { id: "e6", name: "Product Catalog Module", startDate: "2026-04-01", endDate: "2026-06-30", progress: 70, category: "development", assignee: "Dev Team A", dependencies: ["e2", "e3"] },
      { id: "e7", name: "Vendor Management Module", startDate: "2026-04-15", endDate: "2026-07-15", progress: 55, category: "development", assignee: "Dev Team B", dependencies: ["e2"] },
      { id: "e8", name: "Order Management System", startDate: "2026-05-01", endDate: "2026-07-31", progress: 50, category: "development", assignee: "Dev Team C", dependencies: ["e6"] },
      { id: "e9", name: "Payment Gateway Integration", startDate: "2026-05-15", endDate: "2026-07-15", progress: 45, category: "development", assignee: "Payment Team", dependencies: ["e2"] },
      { id: "e10", name: "Inventory Management System", startDate: "2026-05-15", endDate: "2026-08-15", progress: 40, category: "development", assignee: "Dev Team D", dependencies: ["e6", "e7"] },
      { id: "e11", name: "Customer Review & Rating System", startDate: "2026-06-01", endDate: "2026-08-15", progress: 35, category: "development", assignee: "Dev Team E", dependencies: ["e6"] },
      { id: "e12", name: "Search & Recommendation Engine", startDate: "2026-06-15", endDate: "2026-09-15", progress: 25, category: "development", assignee: "AI Team", dependencies: ["e5", "e6"] },
      { id: "e13", name: "iOS App Development", startDate: "2026-04-15", endDate: "2026-09-30", progress: 40, category: "development", assignee: "iOS Team", dependencies: ["e4", "e5"] },
      { id: "e14", name: "Android App Development", startDate: "2026-04-15", endDate: "2026-09-30", progress: 35, category: "development", assignee: "Android Team", dependencies: ["e4", "e5"] },
      { id: "e15", name: "Admin Panel Development", startDate: "2026-06-01", endDate: "2026-09-15", progress: 30, category: "development", assignee: "Admin Team", dependencies: ["e5"] },
      { id: "e16", name: "Integration Testing", startDate: "2026-08-01", endDate: "2026-10-15", progress: 15, category: "testing", assignee: "QA Team", dependencies: ["e5", "e6", "e7", "e8", "e9", "e10"] },
      { id: "e17", name: "Security Audit & Penetration Testing", startDate: "2026-09-01", endDate: "2026-10-15", progress: 10, category: "testing", assignee: "Security Team", dependencies: ["e9", "e15"] },
      { id: "e18", name: "Performance Testing & Optimization", startDate: "2026-09-15", endDate: "2026-10-20", progress: 5, category: "testing", assignee: "Performance Team", dependencies: ["e12"] },
      { id: "e19", name: "Beta Testing & Bug Fixes", startDate: "2026-10-01", endDate: "2026-10-25", progress: 0, category: "testing", assignee: "QA Team", dependencies: ["e13", "e14", "e16"] },
      { id: "e20", name: "Platform Launch", startDate: "2026-10-26", endDate: "2026-10-31", progress: 0, category: "deployment", assignee: "Launch Team", dependencies: ["e17", "e18", "e19"] },
    ]
  },

  // 9. Manufacturing - Automobile Parts
  {
    name: "Automobile Parts Manufacturing Plant",
    description: "Setting up manufacturing facility for automotive components with CNC and assembly lines",
    startDate: "2026-01-05",
    endDate: "2027-02-28",
    tasks: [
      { id: "m1", name: "Market Analysis & Business Planning", startDate: "2026-01-05", endDate: "2026-02-28", progress: 100, category: "planning", assignee: "Strategy Team", dependencies: [] },
      { id: "m2", name: "Plant Location Selection & Acquisition", startDate: "2026-02-01", endDate: "2026-04-30", progress: 90, category: "planning", assignee: "Facilities Team", dependencies: ["m1"] },
      { id: "m3", name: "Plant Layout & Process Design", startDate: "2026-03-01", endDate: "2026-05-31", progress: 85, category: "design", assignee: "Industrial Engineering", dependencies: ["m1"] },
      { id: "m4", name: "CNC Machinery Procurement", startDate: "2026-04-01", endDate: "2026-07-31", progress: 70, category: "planning", assignee: "Procurement Team", dependencies: ["m3"] },
      { id: "m5", name: "Assembly Line Equipment Procurement", startDate: "2026-04-15", endDate: "2026-08-15", progress: 65, category: "planning", assignee: "Procurement Team", dependencies: ["m3"] },
      { id: "m6", name: "Quality Testing Equipment Procurement", startDate: "2026-05-01", endDate: "2026-08-31", progress: 60, category: "planning", assignee: "Procurement Team", dependencies: ["m3"] },
      { id: "m7", name: "Plant Building Construction", startDate: "2026-05-01", endDate: "2026-10-31", progress: 50, category: "development", assignee: "Construction Team", dependencies: ["m2"] },
      { id: "m8", name: "Electrical & Power Infrastructure", startDate: "2026-07-01", endDate: "2026-11-30", progress: 40, category: "development", assignee: "Electrical Team", dependencies: ["m7"] },
      { id: "m9", name: "CNC Machinery Installation", startDate: "2026-09-01", endDate: "2026-12-15", progress: 30, category: "development", assignee: "Installation Team", dependencies: ["m4", "m7", "m8"] },
      { id: "m10", name: "Assembly Line Setup", startDate: "2026-10-01", endDate: "2027-01-15", progress: 20, category: "development", assignee: "Setup Team", dependencies: ["m5", "m7", "m8"] },
      { id: "m11", name: "Quality Lab Setup", startDate: "2026-10-15", endDate: "2027-01-15", progress: 15, category: "development", assignee: "QC Team", dependencies: ["m6", "m7"] },
      { id: "m12", name: "Tool Room Setup", startDate: "2026-09-15", endDate: "2026-12-31", progress: 25, category: "development", assignee: "Tooling Team", dependencies: ["m7"] },
      { id: "m13", name: "ERP Implementation", startDate: "2026-06-01", endDate: "2026-12-31", progress: 35, category: "development", assignee: "IT Team", dependencies: ["m3"] },
      { id: "m14", name: "IATF 16949 Certification Process", startDate: "2026-08-01", endDate: "2027-01-31", progress: 20, category: "planning", assignee: "Quality Team", dependencies: ["m3"] },
      { id: "m15", name: "Skilled Workers Recruitment", startDate: "2026-08-01", endDate: "2026-12-31", progress: 40, category: "planning", assignee: "HR Team", dependencies: ["m1"] },
      { id: "m16", name: "Operator Training Programs", startDate: "2026-11-01", endDate: "2027-01-31", progress: 10, category: "planning", assignee: "Training Team", dependencies: ["m9", "m10", "m15"] },
      { id: "m17", name: "Trial Production Run", startDate: "2027-01-01", endDate: "2027-02-15", progress: 0, category: "testing", assignee: "Production Team", dependencies: ["m9", "m10", "m11", "m16"] },
      { id: "m18", name: "Process Validation & Optimization", startDate: "2027-01-15", endDate: "2027-02-20", progress: 0, category: "testing", assignee: "Process Team", dependencies: ["m17"] },
      { id: "m19", name: "Quality System Audit", startDate: "2027-02-01", endDate: "2027-02-20", progress: 0, category: "testing", assignee: "Quality Team", dependencies: ["m14", "m17"] },
      { id: "m20", name: "Production Launch", startDate: "2027-02-21", endDate: "2027-02-28", progress: 0, category: "deployment", assignee: "Plant Manager", dependencies: ["m18", "m19"] },
    ]
  },

  // 10. Oil & Gas - Refinery Expansion
  {
    name: "Oil Refinery Expansion Project",
    description: "Expansion of refinery capacity with new processing units and storage facilities",
    startDate: "2026-01-05",
    endDate: "2028-12-31",
    tasks: [
      { id: "o1", name: "Feasibility Study & Environmental Assessment", startDate: "2026-01-05", endDate: "2026-06-30", progress: 100, category: "planning", assignee: "Engineering Team", dependencies: [] },
      { id: "o2", name: "Front-End Engineering Design (FEED)", startDate: "2026-04-01", endDate: "2026-12-31", progress: 75, category: "design", assignee: "Design Team", dependencies: ["o1"] },
      { id: "o3", name: "Regulatory Permits & Approvals", startDate: "2026-07-01", endDate: "2027-03-31", progress: 50, category: "planning", assignee: "Regulatory Team", dependencies: ["o1"] },
      { id: "o4", name: "Detailed Engineering Design", startDate: "2027-01-01", endDate: "2027-09-30", progress: 25, category: "design", assignee: "Engineering Team", dependencies: ["o2"] },
      { id: "o5", name: "Procurement - Major Equipment", startDate: "2027-04-01", endDate: "2027-12-31", progress: 10, category: "planning", assignee: "Procurement Team", dependencies: ["o4"] },
      { id: "o6", name: "Procurement - Piping & Valves", startDate: "2027-06-01", endDate: "2028-02-28", progress: 5, category: "planning", assignee: "Procurement Team", dependencies: ["o4"] },
      { id: "o7", name: "Procurement - Electrical & Instrumentation", startDate: "2027-07-01", endDate: "2028-03-31", progress: 0, category: "planning", assignee: "Procurement Team", dependencies: ["o4"] },
      { id: "o8", name: "Site Preparation & Civil Works", startDate: "2027-06-01", endDate: "2028-02-28", progress: 5, category: "development", assignee: "Civil Team", dependencies: ["o3"] },
      { id: "o9", name: "Process Unit Foundation & Structure", startDate: "2027-09-01", endDate: "2028-06-30", progress: 0, category: "development", assignee: "Construction Team", dependencies: ["o8"] },
      { id: "o10", name: "Equipment Installation - Primary Unit", startDate: "2028-01-01", endDate: "2028-08-31", progress: 0, category: "development", assignee: "Installation Team", dependencies: ["o5", "o9"] },
      { id: "o11", name: "Equipment Installation - Secondary Unit", startDate: "2028-03-01", endDate: "2028-10-31", progress: 0, category: "development", assignee: "Installation Team", dependencies: ["o5", "o9"] },
      { id: "o12", name: "Piping Installation", startDate: "2028-04-01", endDate: "2028-10-31", progress: 0, category: "development", assignee: "Piping Team", dependencies: ["o6", "o10"] },
      { id: "o13", name: "Electrical & Instrumentation Installation", startDate: "2028-05-01", endDate: "2028-11-30", progress: 0, category: "development", assignee: "E&I Team", dependencies: ["o7", "o10"] },
      { id: "o14", name: "Storage Tank Farm Construction", startDate: "2028-01-01", endDate: "2028-09-30", progress: 0, category: "development", assignee: "Tank Team", dependencies: ["o8"] },
      { id: "o15", name: "DCS/SCADA System Implementation", startDate: "2028-06-01", endDate: "2028-11-30", progress: 0, category: "development", assignee: "Automation Team", dependencies: ["o13"] },
      { id: "o16", name: "Pre-Commissioning Activities", startDate: "2028-09-01", endDate: "2028-11-30", progress: 0, category: "testing", assignee: "Commissioning Team", dependencies: ["o10", "o11", "o12", "o13"] },
      { id: "o17", name: "Commissioning & Start-up", startDate: "2028-11-01", endDate: "2028-12-15", progress: 0, category: "testing", assignee: "Operations Team", dependencies: ["o15", "o16"] },
      { id: "o18", name: "Performance Testing", startDate: "2028-12-01", endDate: "2028-12-20", progress: 0, category: "testing", assignee: "Testing Team", dependencies: ["o17"] },
      { id: "o19", name: "Safety Audit & Compliance Check", startDate: "2028-12-10", endDate: "2028-12-25", progress: 0, category: "testing", assignee: "Safety Team", dependencies: ["o17"] },
      { id: "o20", name: "Handover & Commercial Operations", startDate: "2028-12-26", endDate: "2028-12-31", progress: 0, category: "deployment", assignee: "Project Director", dependencies: ["o18", "o19"] },
    ]
  },

  // 11. Banking - Digital Banking Platform
  {
    name: "Digital Banking Platform Transformation",
    description: "Complete digital transformation of banking services with mobile and web platforms",
    startDate: "2026-01-05",
    endDate: "2027-06-30",
    tasks: [
      { id: "b1", name: "Digital Strategy & Roadmap Development", startDate: "2026-01-05", endDate: "2026-02-28", progress: 100, category: "planning", assignee: "Strategy Team", dependencies: [] },
      { id: "b2", name: "Regulatory Compliance Planning", startDate: "2026-02-01", endDate: "2026-04-30", progress: 95, category: "planning", assignee: "Compliance Team", dependencies: ["b1"] },
      { id: "b3", name: "Core Banking System Assessment", startDate: "2026-02-15", endDate: "2026-05-31", progress: 90, category: "planning", assignee: "IT Team", dependencies: ["b1"] },
      { id: "b4", name: "Platform Architecture Design", startDate: "2026-04-01", endDate: "2026-07-31", progress: 75, category: "design", assignee: "Architecture Team", dependencies: ["b3"] },
      { id: "b5", name: "UI/UX Design - Web Banking", startDate: "2026-05-01", endDate: "2026-08-31", progress: 65, category: "design", assignee: "Design Team", dependencies: ["b1"] },
      { id: "b6", name: "UI/UX Design - Mobile Banking", startDate: "2026-05-15", endDate: "2026-09-30", progress: 60, category: "design", assignee: "Mobile Design Team", dependencies: ["b1"] },
      { id: "b7", name: "Core Banking Integration Development", startDate: "2026-07-01", endDate: "2027-01-31", progress: 40, category: "development", assignee: "Backend Team", dependencies: ["b4"] },
      { id: "b8", name: "Payment Gateway Development", startDate: "2026-08-01", endDate: "2027-02-28", progress: 35, category: "development", assignee: "Payment Team", dependencies: ["b4"] },
      { id: "b9", name: "Mobile Banking App - iOS", startDate: "2026-09-01", endDate: "2027-03-31", progress: 25, category: "development", assignee: "iOS Team", dependencies: ["b6", "b7"] },
      { id: "b10", name: "Mobile Banking App - Android", startDate: "2026-09-01", endDate: "2027-03-31", progress: 25, category: "development", assignee: "Android Team", dependencies: ["b6", "b7"] },
      { id: "b11", name: "Web Banking Platform Development", startDate: "2026-08-15", endDate: "2027-03-31", progress: 30, category: "development", assignee: "Web Team", dependencies: ["b5", "b7"] },
      { id: "b12", name: "Security Implementation & Encryption", startDate: "2026-10-01", endDate: "2027-03-31", progress: 20, category: "development", assignee: "Security Team", dependencies: ["b4"] },
      { id: "b13", name: "Biometric Authentication System", startDate: "2026-11-01", endDate: "2027-03-31", progress: 15, category: "development", assignee: "Security Team", dependencies: ["b12"] },
      { id: "b14", name: "Fraud Detection System", startDate: "2027-01-01", endDate: "2027-04-30", progress: 10, category: "development", assignee: "AI Team", dependencies: ["b7", "b12"] },
      { id: "b15", name: "API Gateway Development", startDate: "2026-10-15", endDate: "2027-02-28", progress: 20, category: "development", assignee: "API Team", dependencies: ["b4"] },
      { id: "b16", name: "Security Testing & Penetration Testing", startDate: "2027-03-01", endDate: "2027-05-15", progress: 5, category: "testing", assignee: "Security Team", dependencies: ["b9", "b10", "b11", "b12"] },
      { id: "b17", name: "UAT & Regulatory Testing", startDate: "2027-04-01", endDate: "2027-05-31", progress: 0, category: "testing", assignee: "QA Team", dependencies: ["b2", "b16"] },
      { id: "b18", name: "Performance Testing", startDate: "2027-04-15", endDate: "2027-05-31", progress: 0, category: "testing", assignee: "Performance Team", dependencies: ["b9", "b10", "b11"] },
      { id: "b19", name: "Staff Training & Change Management", startDate: "2027-04-01", endDate: "2027-06-15", progress: 0, category: "planning", assignee: "Training Team", dependencies: ["b11"] },
      { id: "b20", name: "Phased Launch & Go-Live", startDate: "2027-06-01", endDate: "2027-06-30", progress: 0, category: "deployment", assignee: "Project Manager", dependencies: ["b17", "b18", "b19"] },
    ]
  },

  // 12. Education - University Campus
  {
    name: "University Campus Development",
    description: "Establishment of new university campus with academic buildings, hostels, and facilities",
    startDate: "2026-01-05",
    endDate: "2028-08-31",
    tasks: [
      { id: "u1", name: "Land Acquisition & Legal Clearances", startDate: "2026-01-05", endDate: "2026-06-30", progress: 100, category: "planning", assignee: "Legal Team", dependencies: [] },
      { id: "u2", name: "University Affiliation & Approvals", startDate: "2026-03-01", endDate: "2026-12-31", progress: 70, category: "planning", assignee: "Academic Board", dependencies: ["u1"] },
      { id: "u3", name: "Master Plan & Campus Design", startDate: "2026-05-01", endDate: "2026-12-31", progress: 60, category: "design", assignee: "Architecture Team", dependencies: ["u1"] },
      { id: "u4", name: "Academic Block Design - Engineering", startDate: "2026-08-01", endDate: "2027-02-28", progress: 40, category: "design", assignee: "Design Team A", dependencies: ["u3"] },
      { id: "u5", name: "Academic Block Design - Business", startDate: "2026-09-01", endDate: "2027-03-31", progress: 35, category: "design", assignee: "Design Team B", dependencies: ["u3"] },
      { id: "u6", name: "Central Library Design", startDate: "2026-10-01", endDate: "2027-04-30", progress: 30, category: "design", assignee: "Library Design Team", dependencies: ["u3"] },
      { id: "u7", name: "Hostel Design - Boys & Girls", startDate: "2026-10-01", endDate: "2027-04-30", progress: 30, category: "design", assignee: "Hostel Design Team", dependencies: ["u3"] },
      { id: "u8", name: "Sports Complex Design", startDate: "2026-11-01", endDate: "2027-05-31", progress: 25, category: "design", assignee: "Sports Design Team", dependencies: ["u3"] },
      { id: "u9", name: "Infrastructure Development - Phase 1", startDate: "2027-01-01", endDate: "2027-10-31", progress: 20, category: "development", assignee: "Construction Team", dependencies: ["u3"] },
      { id: "u10", name: "Academic Block Construction - Engineering", startDate: "2027-03-01", endDate: "2028-03-31", progress: 10, category: "development", assignee: "Construction Team A", dependencies: ["u4", "u9"] },
      { id: "u11", name: "Academic Block Construction - Business", startDate: "2027-04-01", endDate: "2028-04-30", progress: 5, category: "development", assignee: "Construction Team B", dependencies: ["u5", "u9"] },
      { id: "u12", name: "Central Library Construction", startDate: "2027-05-01", endDate: "2028-05-31", progress: 5, category: "development", assignee: "Construction Team C", dependencies: ["u6", "u9"] },
      { id: "u13", name: "Hostel Construction", startDate: "2027-05-01", endDate: "2028-04-30", progress: 5, category: "development", assignee: "Construction Team D", dependencies: ["u7", "u9"] },
      { id: "u14", name: "Administrative Building Construction", startDate: "2027-03-15", endDate: "2028-02-28", progress: 10, category: "development", assignee: "Construction Team E", dependencies: ["u9"] },
      { id: "u15", name: "Sports Complex Construction", startDate: "2027-06-01", endDate: "2028-06-30", progress: 0, category: "development", assignee: "Sports Contractor", dependencies: ["u8", "u9"] },
      { id: "u16", name: "Faculty Recruitment", startDate: "2027-06-01", endDate: "2028-06-30", progress: 10, category: "planning", assignee: "HR Team", dependencies: ["u2"] },
      { id: "u17", name: "Laboratory Equipment Procurement", startDate: "2027-10-01", endDate: "2028-05-31", progress: 0, category: "planning", assignee: "Procurement Team", dependencies: ["u10"] },
      { id: "u18", name: "IT Infrastructure Setup", startDate: "2028-01-01", endDate: "2028-06-30", progress: 0, category: "development", assignee: "IT Team", dependencies: ["u10", "u11", "u12"] },
      { id: "u19", name: "Inspections & Certifications", startDate: "2028-05-01", endDate: "2028-07-31", progress: 0, category: "testing", assignee: "Quality Team", dependencies: ["u10", "u11", "u13", "u14"] },
      { id: "u20", name: "Campus Inauguration & First Batch", startDate: "2028-08-01", endDate: "2028-08-31", progress: 0, category: "deployment", assignee: "University Director", dependencies: ["u16", "u17", "u18", "u19"] },
    ]
  },

  // 13. Hotel - Luxury Resort
  {
    name: "Luxury Beach Resort Development",
    description: "Development of 5-star beach resort with 200 rooms, spa, restaurants, and recreational facilities",
    startDate: "2026-01-05",
    endDate: "2027-12-31",
    tasks: [
      { id: "ht1", name: "Site Selection & Land Acquisition", startDate: "2026-01-05", endDate: "2026-04-30", progress: 100, category: "planning", assignee: "Acquisition Team", dependencies: [] },
      { id: "ht2", name: "Environmental & Coastal Regulations Clearance", startDate: "2026-02-01", endDate: "2026-08-31", progress: 80, category: "planning", assignee: "Legal Team", dependencies: ["ht1"] },
      { id: "ht3", name: "Resort Concept & Master Planning", startDate: "2026-04-01", endDate: "2026-09-30", progress: 70, category: "design", assignee: "Design Team", dependencies: ["ht1"] },
      { id: "ht4", name: "Architecture Design - Main Building", startDate: "2026-06-01", endDate: "2026-11-30", progress: 55, category: "design", assignee: "Architecture Team", dependencies: ["ht3"] },
      { id: "ht5", name: "Architecture Design - Villas & Cottages", startDate: "2026-07-01", endDate: "2026-12-31", progress: 50, category: "design", assignee: "Design Team B", dependencies: ["ht3"] },
      { id: "ht6", name: "Interior Design Concept", startDate: "2026-08-01", endDate: "2027-02-28", progress: 40, category: "design", assignee: "Interior Designer", dependencies: ["ht4"] },
      { id: "ht7", name: "Landscape Design", startDate: "2026-09-01", endDate: "2027-03-31", progress: 35, category: "design", assignee: "Landscape Architect", dependencies: ["ht3"] },
      { id: "ht8", name: "Spa & Wellness Center Design", startDate: "2026-09-01", endDate: "2027-03-31", progress: 35, category: "design", assignee: "Spa Design Team", dependencies: ["ht3"] },
      { id: "ht9", name: "F&B Outlet Design", startDate: "2026-10-01", endDate: "2027-04-30", progress: 30, category: "design", assignee: "F&B Design Team", dependencies: ["ht4"] },
      { id: "ht10", name: "Main Building Construction", startDate: "2026-11-01", endDate: "2027-08-31", progress: 25, category: "development", assignee: "Construction Team A", dependencies: ["ht2", "ht4"] },
      { id: "ht11", name: "Villas & Cottages Construction", startDate: "2027-01-01", endDate: "2027-09-30", progress: 15, category: "development", assignee: "Construction Team B", dependencies: ["ht2", "ht5"] },
      { id: "ht12", name: "Swimming Pool & Water Features", startDate: "2027-04-01", endDate: "2027-09-30", progress: 10, category: "development", assignee: "Pool Contractor", dependencies: ["ht10"] },
      { id: "ht13", name: "Spa & Wellness Center Construction", startDate: "2027-03-01", endDate: "2027-10-31", progress: 10, category: "development", assignee: "Spa Contractor", dependencies: ["ht8", "ht10"] },
      { id: "ht14", name: "Restaurant & Bar Outfitting", startDate: "2027-06-01", endDate: "2027-11-30", progress: 5, category: "development", assignee: "F&B Team", dependencies: ["ht9", "ht10"] },
      { id: "ht15", name: "Landscape Implementation", startDate: "2027-05-01", endDate: "2027-11-30", progress: 5, category: "development", assignee: "Landscape Team", dependencies: ["ht7", "ht10", "ht11"] },
      { id: "ht16", name: "FF&E Procurement & Installation", startDate: "2027-07-01", endDate: "2027-11-30", progress: 5, category: "development", assignee: "Procurement Team", dependencies: ["ht6", "ht10", "ht11"] },
      { id: "ht17", name: "Staff Recruitment & Training", startDate: "2027-06-01", endDate: "2027-12-15", progress: 10, category: "planning", assignee: "HR Team", dependencies: ["ht3"] },
      { id: "ht18", name: "IT Systems & Property Management Setup", startDate: "2027-08-01", endDate: "2027-11-30", progress: 5, category: "development", assignee: "IT Team", dependencies: ["ht10"] },
      { id: "ht19", name: "Soft Opening & Trial Operations", startDate: "2027-11-15", endDate: "2027-12-15", progress: 0, category: "testing", assignee: "Operations Team", dependencies: ["ht16", "ht17", "ht18"] },
      { id: "ht20", name: "Grand Opening", startDate: "2027-12-20", endDate: "2027-12-31", progress: 0, category: "deployment", assignee: "General Manager", dependencies: ["ht19"] },
    ]
  },

  // 14. Retail - Supermarket Chain
  {
    name: "Supermarket Chain Expansion - 25 Stores",
    description: "Opening 25 new supermarket locations across the region with centralized distribution",
    startDate: "2026-01-05",
    endDate: "2027-06-30",
    tasks: [
      { id: "s1", name: "Market Analysis & Location Selection", startDate: "2026-01-05", endDate: "2026-03-31", progress: 100, category: "planning", assignee: "Strategy Team", dependencies: [] },
      { id: "s2", name: "Lease Negotiations - Phase 1 (10 stores)", startDate: "2026-03-01", endDate: "2026-06-30", progress: 85, category: "planning", assignee: "Real Estate Team", dependencies: ["s1"] },
      { id: "s3", name: "Lease Negotiations - Phase 2 (15 stores)", startDate: "2026-05-01", endDate: "2026-09-30", progress: 60, category: "planning", assignee: "Real Estate Team", dependencies: ["s1"] },
      { id: "s4", name: "Store Design Template Development", startDate: "2026-02-15", endDate: "2026-05-31", progress: 95, category: "design", assignee: "Design Team", dependencies: ["s1"] },
      { id: "s5", name: "Distribution Center Setup", startDate: "2026-04-01", endDate: "2026-12-31", progress: 50, category: "development", assignee: "Logistics Team", dependencies: ["s1"] },
      { id: "s6", name: "IT Infrastructure & POS Systems", startDate: "2026-05-01", endDate: "2026-11-30", progress: 55, category: "development", assignee: "IT Team", dependencies: ["s4"] },
      { id: "s7", name: "Vendor Agreements & Supplier Setup", startDate: "2026-04-01", endDate: "2026-10-31", progress: 65, category: "planning", assignee: "Procurement Team", dependencies: ["s1"] },
      { id: "s8", name: "Store Renovation - Phase 1 (10 stores)", startDate: "2026-06-01", endDate: "2026-10-31", progress: 45, category: "development", assignee: "Construction Team", dependencies: ["s2", "s4"] },
      { id: "s9", name: "Store Renovation - Phase 2 (15 stores)", startDate: "2026-09-01", endDate: "2027-03-31", progress: 20, category: "development", assignee: "Construction Team", dependencies: ["s3", "s4"] },
      { id: "s10", name: "Cold Storage & Refrigeration Setup", startDate: "2026-09-01", endDate: "2027-03-31", progress: 30, category: "development", assignee: "Refrigeration Team", dependencies: ["s8"] },
      { id: "s11", name: "Shelving & Display Installation - Phase 1", startDate: "2026-09-15", endDate: "2026-11-30", progress: 40, category: "development", assignee: "Fit-out Team", dependencies: ["s8"] },
      { id: "s12", name: "Shelving & Display Installation - Phase 2", startDate: "2027-01-01", endDate: "2027-04-30", progress: 15, category: "development", assignee: "Fit-out Team", dependencies: ["s9"] },
      { id: "s13", name: "Staff Recruitment - Phase 1", startDate: "2026-08-01", endDate: "2026-11-30", progress: 50, category: "planning", assignee: "HR Team", dependencies: ["s2"] },
      { id: "s14", name: "Staff Recruitment - Phase 2", startDate: "2026-11-01", endDate: "2027-04-30", progress: 20, category: "planning", assignee: "HR Team", dependencies: ["s3"] },
      { id: "s15", name: "Staff Training Program", startDate: "2026-10-01", endDate: "2027-05-31", progress: 30, category: "planning", assignee: "Training Team", dependencies: ["s13"] },
      { id: "s16", name: "Marketing Campaign Development", startDate: "2026-09-01", endDate: "2026-12-31", progress: 45, category: "marketing", assignee: "Marketing Team", dependencies: ["s4"] },
      { id: "s17", name: "Store Opening - Phase 1 (10 stores)", startDate: "2026-11-15", endDate: "2026-12-31", progress: 20, category: "deployment", assignee: "Operations Team", dependencies: ["s8", "s11", "s13", "s16"] },
      { id: "s18", name: "Store Opening - Phase 2 (15 stores)", startDate: "2027-04-01", endDate: "2027-06-15", progress: 0, category: "deployment", assignee: "Operations Team", dependencies: ["s9", "s12", "s14", "s16"] },
      { id: "s19", name: "Distribution Center Operations Launch", startDate: "2027-01-01", endDate: "2027-02-28", progress: 0, category: "deployment", assignee: "Logistics Team", dependencies: ["s5", "s7"] },
      { id: "s20", name: "Full Network Operations", startDate: "2027-06-15", endDate: "2027-06-30", progress: 0, category: "deployment", assignee: "Operations Director", dependencies: ["s17", "s18", "s19"] },
    ]
  },

  // 15. Logistics - Distribution Hub
  {
    name: "Regional Distribution Hub Development",
    description: "Construction of large-scale distribution center with automated warehousing systems",
    startDate: "2026-01-05",
    endDate: "2027-04-30",
    tasks: [
      { id: "l1", name: "Site Selection & Feasibility Study", startDate: "2026-01-05", endDate: "2026-03-31", progress: 100, category: "planning", assignee: "Strategy Team", dependencies: [] },
      { id: "l2", name: "Land Acquisition & Zoning Approvals", startDate: "2026-03-01", endDate: "2026-06-30", progress: 90, category: "planning", assignee: "Legal Team", dependencies: ["l1"] },
      { id: "l3", name: "Warehouse Design & Layout Planning", startDate: "2026-04-01", endDate: "2026-08-31", progress: 75, category: "design", assignee: "Design Team", dependencies: ["l1"] },
      { id: "l4", name: "Automation System Design", startDate: "2026-05-01", endDate: "2026-10-31", progress: 60, category: "design", assignee: "Automation Team", dependencies: ["l3"] },
      { id: "l5", name: "IT Infrastructure Planning", startDate: "2026-06-01", endDate: "2026-10-31", progress: 55, category: "design", assignee: "IT Team", dependencies: ["l3"] },
      { id: "l6", name: "Building Construction", startDate: "2026-07-01", endDate: "2027-01-31", progress: 40, category: "development", assignee: "Construction Team", dependencies: ["l2", "l3"] },
      { id: "l7", name: "Dock & Loading Bay Construction", startDate: "2026-10-01", endDate: "2027-02-28", progress: 30, category: "development", assignee: "Construction Team", dependencies: ["l6"] },
      { id: "l8", name: "Automated Storage & Retrieval System Installation", startDate: "2027-01-01", endDate: "2027-03-31", progress: 15, category: "development", assignee: "ASRS Vendor", dependencies: ["l4", "l6"] },
      { id: "l9", name: "Conveyor System Installation", startDate: "2027-01-15", endDate: "2027-03-15", progress: 10, category: "development", assignee: "Conveyor Team", dependencies: ["l4", "l6"] },
      { id: "l10", name: "Sortation System Installation", startDate: "2027-02-01", endDate: "2027-03-31", progress: 5, category: "development", assignee: "Sortation Team", dependencies: ["l4", "l9"] },
      { id: "l11", name: "WMS Implementation", startDate: "2026-10-01", endDate: "2027-03-31", progress: 25, category: "development", assignee: "IT Team", dependencies: ["l5"] },
      { id: "l12", name: "Fleet Management System Setup", startDate: "2026-11-01", endDate: "2027-03-15", progress: 20, category: "development", assignee: "IT Team", dependencies: ["l5"] },
      { id: "l13", name: "Cold Storage Facility Setup", startDate: "2027-01-01", endDate: "2027-03-15", progress: 10, category: "development", assignee: "Refrigeration Team", dependencies: ["l6"] },
      { id: "l14", name: "Fleet Acquisition", startDate: "2026-09-01", endDate: "2027-02-28", progress: 35, category: "planning", assignee: "Procurement Team", dependencies: ["l1"] },
      { id: "l15", name: "Staff Recruitment", startDate: "2026-11-01", endDate: "2027-03-31", progress: 25, category: "planning", assignee: "HR Team", dependencies: ["l1"] },
      { id: "l16", name: "Staff Training - WMS & Systems", startDate: "2027-02-01", endDate: "2027-04-15", progress: 5, category: "planning", assignee: "Training Team", dependencies: ["l11", "l15"] },
      { id: "l17", name: "Equipment Testing & Calibration", startDate: "2027-03-01", endDate: "2027-04-15", progress: 0, category: "testing", assignee: "QA Team", dependencies: ["l8", "l9", "l10"] },
      { id: "l18", name: "Integrated System Testing", startDate: "2027-03-15", endDate: "2027-04-20", progress: 0, category: "testing", assignee: "IT Team", dependencies: ["l11", "l12", "l17"] },
      { id: "l19", name: "Trial Operations", startDate: "2027-04-01", endDate: "2027-04-20", progress: 0, category: "testing", assignee: "Operations Team", dependencies: ["l16", "l18"] },
      { id: "l20", name: "Full Operations Launch", startDate: "2027-04-21", endDate: "2027-04-30", progress: 0, category: "deployment", assignee: "Hub Manager", dependencies: ["l19"] },
    ]
  },

  // 16. Agriculture - Smart Farming
  {
    name: "Smart Farming Implementation Project",
    description: "Implementation of precision agriculture technology across 5000 acres of farmland",
    startDate: "2026-01-05",
    endDate: "2027-03-31",
    tasks: [
      { id: "a1", name: "Soil Analysis & Land Survey", startDate: "2026-01-05", endDate: "2026-03-31", progress: 100, category: "planning", assignee: "Agronomy Team", dependencies: [] },
      { id: "a2", name: "Technology Assessment & Selection", startDate: "2026-02-01", endDate: "2026-05-31", progress: 90, category: "planning", assignee: "Tech Team", dependencies: ["a1"] },
      { id: "a3", name: "Irrigation System Design", startDate: "2026-03-01", endDate: "2026-07-31", progress: 75, category: "design", assignee: "Irrigation Team", dependencies: ["a1"] },
      { id: "a4", name: "IoT Sensor Network Design", startDate: "2026-04-01", endDate: "2026-08-31", progress: 65, category: "design", assignee: "IoT Team", dependencies: ["a2"] },
      { id: "a5", name: "Drone Fleet Planning", startDate: "2026-04-15", endDate: "2026-08-31", progress: 60, category: "design", assignee: "Drone Team", dependencies: ["a2"] },
      { id: "a6", name: "Farm Management Software Selection", startDate: "2026-05-01", endDate: "2026-09-30", progress: 55, category: "planning", assignee: "IT Team", dependencies: ["a2"] },
      { id: "a7", name: "Drip Irrigation Installation - Zone 1", startDate: "2026-06-01", endDate: "2026-10-31", progress: 45, category: "development", assignee: "Irrigation Team", dependencies: ["a3"] },
      { id: "a8", name: "Drip Irrigation Installation - Zone 2", startDate: "2026-08-01", endDate: "2026-12-31", progress: 30, category: "development", assignee: "Irrigation Team", dependencies: ["a3"] },
      { id: "a9", name: "IoT Sensor Deployment - Soil Sensors", startDate: "2026-08-01", endDate: "2026-11-30", progress: 35, category: "development", assignee: "IoT Team", dependencies: ["a4"] },
      { id: "a10", name: "IoT Sensor Deployment - Weather Stations", startDate: "2026-09-01", endDate: "2026-12-31", progress: 25, category: "development", assignee: "IoT Team", dependencies: ["a4"] },
      { id: "a11", name: "Automated Gate & Valve Installation", startDate: "2026-10-01", endDate: "2027-01-31", progress: 20, category: "development", assignee: "Automation Team", dependencies: ["a7", "a8"] },
      { id: "a12", name: "Drone Fleet Procurement & Setup", startDate: "2026-09-01", endDate: "2026-12-31", progress: 30, category: "development", assignee: "Drone Team", dependencies: ["a5"] },
      { id: "a13", name: "Farm Management Software Implementation", startDate: "2026-10-01", endDate: "2027-02-28", progress: 20, category: "development", assignee: "IT Team", dependencies: ["a6"] },
      { id: "a14", name: "Data Analytics Dashboard Setup", startDate: "2026-11-01", endDate: "2027-02-28", progress: 15, category: "development", assignee: "Data Team", dependencies: ["a9", "a10", "a13"] },
      { id: "a15", name: "Precision Equipment Procurement", startDate: "2026-08-01", endDate: "2027-01-31", progress: 35, category: "planning", assignee: "Procurement Team", dependencies: ["a2"] },
      { id: "a16", name: "Staff Training - Technology Systems", startDate: "2027-01-01", endDate: "2027-03-15", progress: 5, category: "planning", assignee: "Training Team", dependencies: ["a13", "a14"] },
      { id: "a17", name: "System Integration Testing", startDate: "2027-02-01", endDate: "2027-03-15", progress: 0, category: "testing", assignee: "Tech Team", dependencies: ["a11", "a13", "a14"] },
      { id: "a18", name: "Crop Planning & Precision Planting", startDate: "2027-02-15", endDate: "2027-03-25", progress: 0, category: "development", assignee: "Agronomy Team", dependencies: ["a17"] },
      { id: "a19", name: "Pilot Season Monitoring", startDate: "2027-03-01", endDate: "2027-03-25", progress: 0, category: "testing", assignee: "Operations Team", dependencies: ["a16", "a17"] },
      { id: "a20", name: "Full Smart Farming Operations", startDate: "2027-03-26", endDate: "2027-03-31", progress: 0, category: "deployment", assignee: "Farm Manager", dependencies: ["a18", "a19"] },
    ]
  },

  // 17. Automotive - EV Manufacturing
  {
    name: "Electric Vehicle Manufacturing Plant",
    description: "Setting up EV manufacturing facility with battery production line",
    startDate: "2026-01-05",
    endDate: "2028-06-30",
    tasks: [
      { id: "ev1", name: "Market Research & Business Case", startDate: "2026-01-05", endDate: "2026-04-30", progress: 100, category: "planning", assignee: "Strategy Team", dependencies: [] },
      { id: "ev2", name: "Plant Location Selection", startDate: "2026-03-01", endDate: "2026-07-31", progress: 85, category: "planning", assignee: "Site Team", dependencies: ["ev1"] },
      { id: "ev3", name: "Plant Architecture & Layout Design", startDate: "2026-05-01", endDate: "2026-11-30", progress: 70, category: "design", assignee: "Design Team", dependencies: ["ev1"] },
      { id: "ev4", name: "Production Line Design - Body Shop", startDate: "2026-07-01", endDate: "2027-02-28", progress: 50, category: "design", assignee: "Engineering Team", dependencies: ["ev3"] },
      { id: "ev5", name: "Production Line Design - Paint Shop", startDate: "2026-08-01", endDate: "2027-03-31", progress: 45, category: "design", assignee: "Paint Engineering", dependencies: ["ev3"] },
      { id: "ev6", name: "Production Line Design - Assembly", startDate: "2026-09-01", endDate: "2027-04-30", progress: 40, category: "design", assignee: "Assembly Engineering", dependencies: ["ev3"] },
      { id: "ev7", name: "Battery Pack Production Line Design", startDate: "2026-08-01", endDate: "2027-04-30", progress: 40, category: "design", assignee: "Battery Team", dependencies: ["ev3"] },
      { id: "ev8", name: "Building Construction - Main Plant", startDate: "2026-10-01", endDate: "2027-09-30", progress: 30, category: "development", assignee: "Construction Team", dependencies: ["ev2", "ev3"] },
      { id: "ev9", name: "Building Construction - Battery Plant", startDate: "2027-01-01", endDate: "2027-10-31", progress: 20, category: "development", assignee: "Construction Team", dependencies: ["ev2", "ev7"] },
      { id: "ev10", name: "Robotic Systems Procurement", startDate: "2027-01-01", endDate: "2027-08-31", progress: 15, category: "planning", assignee: "Procurement Team", dependencies: ["ev4", "ev5", "ev6"] },
      { id: "ev11", name: "Body Shop Installation", startDate: "2027-06-01", endDate: "2027-12-31", progress: 10, category: "development", assignee: "Installation Team", dependencies: ["ev4", "ev8", "ev10"] },
      { id: "ev12", name: "Paint Shop Installation", startDate: "2027-07-01", endDate: "2028-01-31", progress: 5, category: "development", assignee: "Paint Team", dependencies: ["ev5", "ev8", "ev10"] },
      { id: "ev13", name: "Assembly Line Installation", startDate: "2027-08-01", endDate: "2028-02-28", progress: 5, category: "development", assignee: "Assembly Team", dependencies: ["ev6", "ev8", "ev10"] },
      { id: "ev14", name: "Battery Production Line Installation", startDate: "2027-08-01", endDate: "2028-03-31", progress: 0, category: "development", assignee: "Battery Team", dependencies: ["ev7", "ev9"] },
      { id: "ev15", name: "Quality Control Systems Setup", startDate: "2027-10-01", endDate: "2028-03-31", progress: 0, category: "development", assignee: "QC Team", dependencies: ["ev11", "ev12", "ev13"] },
      { id: "ev16", name: "IT Systems & MES Implementation", startDate: "2027-06-01", endDate: "2028-02-28", progress: 10, category: "development", assignee: "IT Team", dependencies: ["ev3"] },
      { id: "ev17", name: "Staff Recruitment & Training", startDate: "2027-06-01", endDate: "2028-04-30", progress: 10, category: "planning", assignee: "HR Team", dependencies: ["ev3"] },
      { id: "ev18", name: "Trial Production", startDate: "2028-03-01", endDate: "2028-05-31", progress: 0, category: "testing", assignee: "Production Team", dependencies: ["ev11", "ev12", "ev13", "ev14", "ev17"] },
      { id: "ev19", name: "Quality Certification & Homologation", startDate: "2028-04-01", endDate: "2028-06-15", progress: 0, category: "testing", assignee: "Certification Team", dependencies: ["ev15", "ev18"] },
      { id: "ev20", name: "Production Launch", startDate: "2028-06-20", endDate: "2028-06-30", progress: 0, category: "deployment", assignee: "Plant Director", dependencies: ["ev19"] },
    ]
  },

  // 18. Telecommunications - 5G Network
  {
    name: "5G Network Rollout - Metropolitan Area",
    description: "Deployment of 5G network infrastructure across metropolitan region",
    startDate: "2026-01-05",
    endDate: "2027-06-30",
    tasks: [
      { id: "tg1", name: "Network Planning & Design", startDate: "2026-01-05", endDate: "2026-05-31", progress: 100, category: "planning", assignee: "Network Team", dependencies: [] },
      { id: "tg2", name: "Spectrum Acquisition & Licensing", startDate: "2026-02-01", endDate: "2026-07-31", progress: 90, category: "planning", assignee: "Regulatory Team", dependencies: ["tg1"] },
      { id: "tg3", name: "Site Survey & Selection - Zone A", startDate: "2026-04-01", endDate: "2026-08-31", progress: 80, category: "planning", assignee: "Site Team", dependencies: ["tg1"] },
      { id: "tg4", name: "Site Survey & Selection - Zone B", startDate: "2026-05-01", endDate: "2026-09-30", progress: 75, category: "planning", assignee: "Site Team", dependencies: ["tg1"] },
      { id: "tg5", name: "Site Survey & Selection - Zone C", startDate: "2026-06-01", endDate: "2026-10-31", progress: 70, category: "planning", assignee: "Site Team", dependencies: ["tg1"] },
      { id: "tg6", name: "Core Network Design & Procurement", startDate: "2026-05-01", endDate: "2026-11-30", progress: 55, category: "development", assignee: "Core Team", dependencies: ["tg1"] },
      { id: "tg7", name: "Fiber Backbone Expansion", startDate: "2026-06-01", endDate: "2027-02-28", progress: 45, category: "development", assignee: "Fiber Team", dependencies: ["tg1"] },
      { id: "tg8", name: "Tower Construction - Zone A", startDate: "2026-08-01", endDate: "2027-02-28", progress: 35, category: "development", assignee: "Construction Team", dependencies: ["tg3"] },
      { id: "tg9", name: "Tower Construction - Zone B", startDate: "2026-09-01", endDate: "2027-03-31", progress: 30, category: "development", assignee: "Construction Team", dependencies: ["tg4"] },
      { id: "tg10", name: "Tower Construction - Zone C", startDate: "2026-10-01", endDate: "2027-04-30", progress: 25, category: "development", assignee: "Construction Team", dependencies: ["tg5"] },
      { id: "tg11", name: "5G Radio Equipment Installation - Zone A", startDate: "2027-01-01", endDate: "2027-04-30", progress: 15, category: "development", assignee: "RF Team", dependencies: ["tg8"] },
      { id: "tg12", name: "5G Radio Equipment Installation - Zone B", startDate: "2027-02-01", endDate: "2027-05-31", progress: 10, category: "development", assignee: "RF Team", dependencies: ["tg9"] },
      { id: "tg13", name: "5G Radio Equipment Installation - Zone C", startDate: "2027-03-01", endDate: "2027-06-15", progress: 5, category: "development", assignee: "RF Team", dependencies: ["tg10"] },
      { id: "tg14", name: "Core Network Installation", startDate: "2026-11-01", endDate: "2027-03-31", progress: 25, category: "development", assignee: "Core Team", dependencies: ["tg6"] },
      { id: "tg15", name: "Network Testing - Zone A", startDate: "2027-04-01", endDate: "2027-05-15", progress: 5, category: "testing", assignee: "Test Team", dependencies: ["tg7", "tg11", "tg14"] },
      { id: "tg16", name: "Network Testing - Zone B", startDate: "2027-05-01", endDate: "2027-06-15", progress: 0, category: "testing", assignee: "Test Team", dependencies: ["tg7", "tg12", "tg14"] },
      { id: "tg17", name: "Network Testing - Zone C", startDate: "2027-05-15", endDate: "2027-06-20", progress: 0, category: "testing", assignee: "Test Team", dependencies: ["tg7", "tg13", "tg14"] },
      { id: "tg18", name: "Service Provisioning Systems", startDate: "2027-02-01", endDate: "2027-05-31", progress: 15, category: "development", assignee: "IT Team", dependencies: ["tg14"] },
      { id: "tg19", name: "Commercial Launch Preparation", startDate: "2027-05-01", endDate: "2027-06-20", progress: 0, category: "planning", assignee: "Launch Team", dependencies: ["tg15", "tg18"] },
      { id: "tg20", name: "Commercial Service Launch", startDate: "2027-06-25", endDate: "2027-06-30", progress: 0, category: "deployment", assignee: "Network Director", dependencies: ["tg16", "tg17", "tg19"] },
    ]
  },

  // 19. Renewable Energy - Solar Farm
  {
    name: "Utility-Scale Solar Farm Development",
    description: "Construction of 100MW solar power plant with grid integration",
    startDate: "2026-01-05",
    endDate: "2027-09-30",
    tasks: [
      { id: "so1", name: "Site Selection & Land Acquisition", startDate: "2026-01-05", endDate: "2026-05-31", progress: 100, category: "planning", assignee: "Land Team", dependencies: [] },
      { id: "so2", name: "Environmental Impact Assessment", startDate: "2026-03-01", endDate: "2026-08-31", progress: 85, category: "planning", assignee: "Environmental Team", dependencies: ["so1"] },
      { id: "so3", name: "Grid Connection Agreement & Permits", startDate: "2026-04-01", endDate: "2026-10-31", progress: 75, category: "planning", assignee: "Regulatory Team", dependencies: ["so1"] },
      { id: "so4", name: "Solar Farm Design & Engineering", startDate: "2026-05-01", endDate: "2026-11-30", progress: 65, category: "design", assignee: "Engineering Team", dependencies: ["so1"] },
      { id: "so5", name: "Power Purchase Agreement Negotiation", startDate: "2026-06-01", endDate: "2026-12-31", progress: 55, category: "planning", assignee: "Commercial Team", dependencies: ["so1"] },
      { id: "so6", name: "Solar Panel Procurement", startDate: "2026-08-01", endDate: "2027-02-28", progress: 40, category: "planning", assignee: "Procurement Team", dependencies: ["so4"] },
      { id: "so7", name: "Inverter & Electrical Equipment Procurement", startDate: "2026-09-01", endDate: "2027-03-31", progress: 35, category: "planning", assignee: "Procurement Team", dependencies: ["so4"] },
      { id: "so8", name: "Site Preparation & Grading", startDate: "2026-10-01", endDate: "2027-02-28", progress: 30, category: "development", assignee: "Civil Team", dependencies: ["so2", "so3"] },
      { id: "so9", name: "Access Roads Construction", startDate: "2026-11-01", endDate: "2027-03-31", progress: 25, category: "development", assignee: "Civil Team", dependencies: ["so8"] },
      { id: "so10", name: "Foundation Installation", startDate: "2027-01-01", endDate: "2027-05-31", progress: 15, category: "development", assignee: "Foundation Team", dependencies: ["so8"] },
      { id: "so11", name: "Mounting Structure Installation", startDate: "2027-03-01", endDate: "2027-06-30", progress: 10, category: "development", assignee: "Structural Team", dependencies: ["so10"] },
      { id: "so12", name: "Solar Panel Installation - Phase 1", startDate: "2027-04-01", endDate: "2027-07-31", progress: 5, category: "development", assignee: "Installation Team", dependencies: ["so6", "so11"] },
      { id: "so13", name: "Solar Panel Installation - Phase 2", startDate: "2027-05-01", endDate: "2027-08-31", progress: 0, category: "development", assignee: "Installation Team", dependencies: ["so6", "so11"] },
      { id: "so14", name: "Inverter Station Installation", startDate: "2027-05-01", endDate: "2027-07-31", progress: 0, category: "development", assignee: "Electrical Team", dependencies: ["so7", "so12"] },
      { id: "so15", name: "Cabling & Electrical Connections", startDate: "2027-06-01", endDate: "2027-08-31", progress: 0, category: "development", assignee: "Electrical Team", dependencies: ["so12", "so13", "so14"] },
      { id: "so16", name: "Substation Construction", startDate: "2027-03-01", endDate: "2027-08-31", progress: 5, category: "development", assignee: "Substation Team", dependencies: ["so8"] },
      { id: "so17", name: "Grid Connection & Integration", startDate: "2027-07-01", endDate: "2027-09-15", progress: 0, category: "development", assignee: "Grid Team", dependencies: ["so3", "so15", "so16"] },
      { id: "so18", name: "SCADA System Implementation", startDate: "2027-05-01", endDate: "2027-08-31", progress: 5, category: "development", assignee: "IT Team", dependencies: ["so4"] },
      { id: "so19", name: "Performance Testing & Commissioning", startDate: "2027-08-15", endDate: "2027-09-20", progress: 0, category: "testing", assignee: "Commissioning Team", dependencies: ["so17", "so18"] },
      { id: "so20", name: "Commercial Operation Date", startDate: "2027-09-25", endDate: "2027-09-30", progress: 0, category: "deployment", assignee: "Project Director", dependencies: ["so5", "so19"] },
    ]
  },

  // 20. Media & Entertainment - Streaming Platform
  {
    name: "Video Streaming Platform Development",
    description: "Development of OTT streaming platform with content management and CDN integration",
    startDate: "2026-01-05",
    endDate: "2026-12-31",
    tasks: [
      { id: "st1", name: "Platform Strategy & Feature Planning", startDate: "2026-01-05", endDate: "2026-02-28", progress: 100, category: "planning", assignee: "Product Team", dependencies: [] },
      { id: "st2", name: "Technical Architecture Design", startDate: "2026-02-01", endDate: "2026-04-30", progress: 95, category: "design", assignee: "Architecture Team", dependencies: ["st1"] },
      { id: "st3", name: "UI/UX Design - Web Platform", startDate: "2026-02-15", endDate: "2026-05-31", progress: 85, category: "design", assignee: "Design Team", dependencies: ["st1"] },
      { id: "st4", name: "UI/UX Design - Mobile Apps", startDate: "2026-03-01", endDate: "2026-06-30", progress: 80, category: "design", assignee: "Mobile Design Team", dependencies: ["st1"] },
      { id: "st5", name: "UI/UX Design - Smart TV Apps", startDate: "2026-03-15", endDate: "2026-07-31", progress: 75, category: "design", assignee: "TV Design Team", dependencies: ["st1"] },
      { id: "st6", name: "Backend API Development", startDate: "2026-04-01", endDate: "2026-09-30", progress: 55, category: "development", assignee: "Backend Team", dependencies: ["st2"] },
      { id: "st7", name: "Video Processing Pipeline Development", startDate: "2026-04-15", endDate: "2026-10-31", progress: 50, category: "development", assignee: "Video Team", dependencies: ["st2"] },
      { id: "st8", name: "Content Management System Development", startDate: "2026-05-01", endDate: "2026-10-31", progress: 45, category: "development", assignee: "CMS Team", dependencies: ["st2"] },
      { id: "st9", name: "CDN Integration & Setup", startDate: "2026-06-01", endDate: "2026-10-31", progress: 40, category: "development", assignee: "Infrastructure Team", dependencies: ["st2"] },
      { id: "st10", name: "DRM Implementation", startDate: "2026-06-15", endDate: "2026-10-31", progress: 35, category: "development", assignee: "Security Team", dependencies: ["st2"] },
      { id: "st11", name: "Recommendation Engine Development", startDate: "2026-07-01", endDate: "2026-11-30", progress: 30, category: "development", assignee: "AI Team", dependencies: ["st6"] },
      { id: "st12", name: "User Authentication & Payment Integration", startDate: "2026-07-01", endDate: "2026-10-31", progress: 35, category: "development", assignee: "Integration Team", dependencies: ["st6"] },
      { id: "st13", name: "Web Platform Development", startDate: "2026-06-01", endDate: "2026-11-30", progress: 35, category: "development", assignee: "Web Team", dependencies: ["st3", "st6"] },
      { id: "st14", name: "iOS App Development", startDate: "2026-07-01", endDate: "2026-11-30", progress: 30, category: "development", assignee: "iOS Team", dependencies: ["st4", "st6"] },
      { id: "st15", name: "Android App Development", startDate: "2026-07-01", endDate: "2026-11-30", progress: 30, category: "development", assignee: "Android Team", dependencies: ["st4", "st6"] },
      { id: "st16", name: "Smart TV Apps Development", startDate: "2026-08-01", endDate: "2026-12-15", progress: 20, category: "development", assignee: "TV Team", dependencies: ["st5", "st6"] },
      { id: "st17", name: "Content Licensing & Agreements", startDate: "2026-06-01", endDate: "2026-12-31", progress: 25, category: "planning", assignee: "Content Team", dependencies: ["st1"] },
      { id: "st18", name: "Security Testing & Audit", startDate: "2026-10-01", endDate: "2026-12-15", progress: 10, category: "testing", assignee: "Security Team", dependencies: ["st10", "st12"] },
      { id: "st19", name: "Beta Testing & Performance Testing", startDate: "2026-11-01", endDate: "2026-12-20", progress: 5, category: "testing", assignee: "QA Team", dependencies: ["st13", "st14", "st15", "st16"] },
      { id: "st20", name: "Platform Launch", startDate: "2026-12-21", endDate: "2026-12-31", progress: 0, category: "deployment", assignee: "Launch Team", dependencies: ["st17", "st18", "st19"] },
    ]
  },
]

async function main() {
  console.log("Starting seed...")

  // Clear existing data
  await prisma.task.deleteMany()
  await prisma.project.deleteMany()
  console.log("Cleared existing data")

  // Create projects with tasks
  for (const projectData of projects) {
    const { tasks, ...projectInfo } = projectData

    const project = await prisma.project.create({
      data: projectInfo,
    })
    console.log(`Created project: ${project.name}`)

    // Create tasks for this project
    for (const task of tasks) {
      await prisma.task.create({
        data: {
          id: task.id,
          name: task.name,
          startDate: task.startDate,
          endDate: task.endDate,
          progress: task.progress,
          category: task.category,
          assignee: task.assignee,
          dependencies: task.dependencies.join(","),
          projectId: project.id,
        },
      })
    }
    console.log(`  Created ${tasks.length} tasks`)
  }

  console.log("Seed completed!")
}

main()
  .catch((e) => {
    console.error(e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
