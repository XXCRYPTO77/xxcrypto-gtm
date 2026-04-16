'use client';

/**
 * Ecosystem Module — Act 3
 *
 * Exports four boards for the Hub + 3 sub-page structure:
 *   /act3        → HubBoard
 *   /act3/arena  → ArenaBoard
 *   /act3/zone   → AgentZoneBoard
 *   /act3/events → EventsBoard
 *
 * Legacy: EcosystemBoard / EvolutionBoard / RevenueBoard still exist
 * in their original directories but are no longer the primary entry points.
 * AgentZone and Arena re-import their components.
 */

export { HubBoard } from './boards/Hub';
export { ArenaBoard } from './boards/Arena';
export { AgentZoneBoard } from './boards/AgentZone';
export { EventsBoard } from './boards/Events';
export { Act3Nav } from './boards/Act3Nav';

// Legacy exports — keep for backward compat until fully migrated
export { EcosystemBoard } from './boards/EcosystemBoard';
export { EvolutionBoard } from './boards/EvolutionBoard';
export { RevenueBoard } from './boards/RevenueBoard';
