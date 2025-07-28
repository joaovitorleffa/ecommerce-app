function api(path: string, init?: RequestInit): Promise<Response> {
  return fetch(`http://localhost:3000/${path}`, init);
}

export { api };
