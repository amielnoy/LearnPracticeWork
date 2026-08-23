"""Operator-only views. Everything here is behind the admin token."""

from __future__ import annotations

from fastapi import APIRouter, Request

from ..dependencies import AdminOnly, Customers, Recommendations
from .content import language

router = APIRouter(prefix="/api/admin", dependencies=[AdminOnly])


@router.get("/customers")
async def list_customers(customers: Customers):
    return {"customers": await customers.listing()}


@router.post("/customers/{purchase_id}/recommendations")
async def recommend_actions(purchase_id: str, request: Request, recommendations: Recommendations):
    """Advice for one purchase. The model is never told whose purchase it is."""
    return await recommendations.for_customer(purchase_id, language(request))
