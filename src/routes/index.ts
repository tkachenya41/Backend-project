import { Hono } from "hono";
import { userRoutes } from "./userRoutes";
import { authRoutes } from '@/routes/authRoutes.ts';
export const routes = new Hono();
routes.route( '/',userRoutes);
routes.route('/',authRoutes)