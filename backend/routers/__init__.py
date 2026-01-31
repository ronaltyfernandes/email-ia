"""Módulo de routers."""
from routers.emails import router as emails_router
from routers.health import router as health_router

__all__ = ["emails_router", "health_router"]
