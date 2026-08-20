async def test_login_uses_httponly_session_fixture(api_client, google_jwks, google_token):
    response = await api_client.post("/api/auth/google", json={"credential": google_token()})
    assert response.status_code == 200
    assert "HttpOnly" in response.headers["set-cookie"]
    assert "SameSite=lax" in response.headers["set-cookie"]
    assert response.json()["user"]["email"] == "reader@example.com"
    session = await api_client.get("/api/auth/session")
    assert session.status_code == 200
    assert session.json()["user"]["name"] == "שרה כהן"


async def test_auth_config_exposes_only_the_public_client_id(api_client):
    response = await api_client.get("/api/auth/config")
    assert response.status_code == 200
    assert response.json() == {"clientId": "000000000000-test.apps.googleusercontent.com"}
    assert "SESSION_SECRET" not in response.text


async def test_logout_clears_session_fixture(api_client, google_jwks, google_token):
    await api_client.post("/api/auth/google", json={"credential": google_token()})
    assert (await api_client.post("/api/auth/logout")).status_code == 200
    assert (await api_client.get("/api/auth/session")).status_code == 401


async def test_forged_google_token_is_rejected(api_client):
    response = await api_client.post("/api/auth/google", json={"credential": "not.a.token"})
    assert response.status_code == 401
