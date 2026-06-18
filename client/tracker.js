(function () {
  const API_URL = "https://codefunnel.onrender.com/api/events";

  function getSessionId() {
    let sessionId = localStorage.getItem("cf_session_id");

    if (!sessionId) {
      sessionId = crypto.randomUUID();
      localStorage.setItem("cf_session_id", sessionId);
    }

    return sessionId;
  }

  const sessionId = getSessionId();

  function sendEvent(event) {
    fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(event)
    }).catch(console.error);
  }

  function trackPageView() {
    sendEvent({
      sessionId,
      eventType: "page_view",
      pageUrl: window.location.href,
      timestamp: new Date().toISOString(),
      userAgent: navigator.userAgent
    });
  }

  function trackClick(event) {
    sendEvent({
      sessionId,
      eventType: "click",
      pageUrl: window.location.href,
      timestamp: new Date().toISOString(),
      clickData: {
        x: event.clientX,
        y: event.clientY
      },
      userAgent: navigator.userAgent
    });
  }

  trackPageView();

  document.addEventListener("click", trackClick);
})();
