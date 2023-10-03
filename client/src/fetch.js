const getSecret = (id) => {
    return fetch(`http://localhost:3000/v1/secret/${id}`, {
        method: "GET",
        headers: {
            "Content-Type": "application/json",
            "Accept" : "application/json"
        },
    });
};

const createSecret = (secret) => {
    secret.expire_after = parseInt(secret.expire_after);
    secret.expire_after_views = parseInt(secret.expire_after_views);
  
    return fetch(`http://localhost:3000/v1/secret`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Accept" : "application/json"
      },
      body: JSON.stringify(secret),
    });
  };


export { getSecret, createSecret } ;