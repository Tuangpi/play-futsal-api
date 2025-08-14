# Futsal Activity API Backend

## 🎯 Project Goal
To streamline futsal activity by centralizing court booking, competition organization, and player engagement through a robust backend API.

---

## Overview
This API supports multiple user roles including Court Owners, Competition Hosts, and Players, enabling features such as court management, bookings, competition fixtures, player stats, and real-time notifications.

---

## User Roles & Permissions

- **Court Owner**
  - Register and manage courts
  - Set booking slots
  - Manage bookings and approvals
  - View court usage analytics and revenue

- **Competition Host**
  - Create competitions (friendly, league, tournament)
  - Manage team registrations
  - Schedule fixtures and enter match results
  - Manage referees (optional)
  - View participant statistics

- **Player**
  - Create a player profile
  - Join teams or register as free agents
  - View and join matches and competitions
  - Track performance stats, rankings, and earn badges
  - Optional Team Captain role for team management

---

## Key Features

- Role-based authentication and access control
- Court booking with conflict prevention and payment integration
- Competition management including fixture generation and leaderboards
- Match result entry with detailed stats (goals, cards, MVP)
- Player profile and ranking system
- Notifications using Firebase or WebSocket real-time updates

---

## Tech Stack

- Node.js (Express or NestJS)
- PostgreSQL database
- Redis for caching and live updates
- Firebase or WebSocket for real-time notifications

---

## Getting Started

### Prerequisites
- Node.js v16+
- PostgreSQL
- Redis
- Firebase account (if using FCM)

### Installation

```bash
git clone https://github.com/your-repo/futsal-api.git
cd futsal-api
npm install
