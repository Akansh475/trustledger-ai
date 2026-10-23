# TrustLedger AI ⚖️💳

TrustLedger AI is an AI-powered financial reconciliation platform built to manage PayPal transactions, invoices, refunds, and reconciliation history with audit-grade ledger integrity.

## Architecture & Principles
- **Deterministic Reconciliation**: Backend ledger calculations, invoice-to-payment matching, idempotency, and double-entry principles are strictly deterministic.
- **AI-Assisted Investigation**: An LLM agent assists financial analysts by flagging anomalies, explaining discrepancies, and recommending human-in-the-loop actions without direct write authorization.
- **Auditable & Secure**: Strict validation via Zod, minor currency unit integer arithmetic (no floating-point rounding errors), and full audit logging.

## Tech Stack
- **Frontend**: React, TypeScript, Vite, Tailwind CSS, React Router
- **Backend**: Node.js, Express, TypeScript, Zod
- **Database**: PostgreSQL, Prisma ORM
- **Integrations**: PayPal Sandbox API, LLM API for anomaly investigation

## Development Milestones
- [x] **Milestone 1 (0–10%)**: Project initialization, dependency setup, frontend/backend startup, health endpoint, basic documentation
- [x] **Milestone 2 (10–20%)**: Database connection, Prisma configuration, initial data models
- [ ] **Milestone 3 (20–30%)**: Client and invoice APIs with validation and error handling
- [ ] **Milestone 4 (30–40%)**: Payment records and double-entry ledger with financial integrity safeguards
- [ ] **Milestone 5 (40–50%)**: Deterministic reconciliation engine for matching invoices and payments
- [ ] **Milestone 6 (50–60%)**: Dashboard UI for clients, invoices, payments, and reconciliation results
- [ ] **Milestone 7 (60–70%)**: PayPal Sandbox integration (transaction sync, status handling)
- [ ] **Milestone 8 (70–80%)**: AI anomaly investigation with structured output and evidence
- [ ] **Milestone 9 (80–90%)**: Action center, refund review workflow, audit trail, security hardening
- [ ] **Milestone 10 (90–100%)**: Integration testing, deployment, and hackathon demo preparation

## Getting Started

### Prerequisites
- Node.js (v18+ recommended; tested on v26)
- npm (v10+ recommended)

### Environment Configuration
The platform comes with development defaults. To customize environment variables:
```bash
cp .env.example .env
```
> **Security Notice**: `.env` and sensitive credential files are excluded by `.gitignore` and must never be committed.

### Backend Setup & Verification
```bash
cd server
npm install
npm run dev
```
- Server runs at: `http://localhost:5000`
- Health check verification: `curl http://localhost:5000/health`
- Build check: `npm run build`
- Prisma generate: `npm run prisma:generate`
- Prisma schema validation: `npm run prisma:validate`

### Frontend Setup & Verification
```bash
cd client
npm install
npm run dev
```
- Client runs at: `http://localhost:5173`
- Automated proxy forwards `/health` and `/api` requests to backend on port 5000.
- Build check: `npm run build`
