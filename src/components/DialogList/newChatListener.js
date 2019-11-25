const evt = new CustomEvent("MyEventType", {detail: "Any Object Here"});
window.dispatchEvent(evt);