document.addEventListener("DOMContentLoaded", function () {

  const raffleCriteria = {
    Kabul: { "Mond Nano Blue": 5, "Milano Queen Furious Red": 1, "Mond Nano White": 1, "Milano Fan Pack New York": 1, "Milano Fan Pack London": 1 },
    Herat: { "Mond Nano Blue": 7, "Milano Queen Furious Red": 3, "Mond Nano White": 1, "Milano Fan Pack New York": 1, "Milano Fan Pack London": 1 },
    Kandahar: { "Mond Nano Blue": 3, "Milano Queen Furious Red": 5, "Mond Nano White": 1, "Milano Fan Pack New York": 3, "Milano Fan Pack London": 1 },
    Jalalabad: { "Mond Nano Blue": 6, "Milano Queen Furious Red": 1, "Mond Nano White": 1, "Milano Fan Pack New York": 1, "Milano Fan Pack London": 1 },
    Mazar: { "Mond Nano Blue": 6, "Milano Queen Furious Red": 1, "Mond Nano White": 1, "Milano Fan Pack New York": 1, "Milano Fan Pack London": 1 },
    Helmand: { "Mond Nano Blue": 2, "Milano Queen Furious Red": 4, "Mond Nano White": 1, "Milano Fan Pack New York": 3, "Milano Fan Pack London": 1 },
    Ghazni: { "Mond Nano Blue": 12, "Milano Queen Furious Red": 2, "Mond Nano White": 1, "Milano Fan Pack New York": 2, "Milano Fan Pack London": 1 },
    Konduz: { "Mond Nano Blue": 8, "Milano Queen Furious Red": 1, "Mond Nano White": 2, "Milano Fan Pack New York": 1, "Milano Fan Pack London": 1 },
    Jozjan: { "Mond Nano Blue": 5, "Milano Queen Furious Red": 1, "Mond Nano White": 1, "Milano Fan Pack New York": 1, "Milano Fan Pack London": 1 },
    Khost: { "Mond Nano Blue": 7, "Milano Queen Furious Red": 1, "Mond Nano White": 1, "Milano Fan Pack New York": 1, "Milano Fan Pack London": 1 },
    "Poli Khomre": { "Mond Nano Blue": 6, "Milano Queen Furious Red": 1, "Mond Nano White": 2, "Milano Fan Pack New York": 1, "Milano Fan Pack London": 1 },
    Parwan: { "Mond Nano Blue": 4, "Milano Queen Furious Red": 1, "Mond Nano White": 1, "Milano Fan Pack New York": 1, "Milano Fan Pack London": 1 },
    Badakhshan: { "Mond Nano Blue": 1, "Milano Queen Furious Red": 1, "Mond Nano White": 1, "Milano Fan Pack New York": 1, "Milano Fan Pack London": 1 }
  };

  document.getElementById("region").addEventListener("change", function () {
    const region = this.value;
    document.querySelectorAll("#bagTable tbody tr").forEach(row => {
      const product = row.children[0].innerText.trim();
      row.querySelector(".raffleTarget").innerText =
        raffleCriteria[region] && raffleCriteria[region][product]
          ? raffleCriteria[region][product]
          : "–";
    });
  });

  function setQualified(el, value) {
    if (value > 0) {
      el.innerText = value;
      el.classList.remove("not-eligible-text");
    } else {
      el.innerText = "Not Eligible";
      el.classList.add("not-eligible-text");
    }
  }

  const calculateBtn = document.getElementById("calculate");

  calculateBtn.addEventListener("click", function () {
    calculateBtn.classList.remove("clicked");
    void calculateBtn.offsetWidth;
    calculateBtn.classList.add("clicked");
  });

  calculateBtn.addEventListener("click", function () {
    const region = document.getElementById("region").value;
    if (!region) return alert("Please select region");

    const rows = document.querySelectorAll("#bagTable tbody tr");
    let orders = [], bags = [];

    rows.forEach(r => {
      orders.push(+r.querySelector(".order").value || 0);
      bags.push(+r.querySelector(".bag").innerText);
    });

    const minOrder = Math.min(...orders);
    const totalOuters = orders.reduce((a, b) => a + b, 0);

    const mhrOuters = minOrder > 0 ? minOrder * rows.length : 0;
    const mhrBags = minOrder > 0 ? minOrder * 15 : 0;

    setQualified(document.getElementById("mhrOuters"), mhrOuters);
    document.getElementById("mhrBags").innerText = mhrBags;

    let indOuters = 0, indBags = 0;
    orders.forEach((o, i) => {
      const excess = Math.max(0, o - minOrder);
      indOuters += excess;
      indBags += excess * bags[i];
    });

 const indOutersEl = document.getElementById("indOuters");
setQualified(indOutersEl, indOuters);
if (indOuters === 0) {
  indOutersEl.innerText = "0";
  indOutersEl.classList.remove("not-eligible-text");
}
    document.getElementById("indBags").innerText = indBags;

    document.getElementById("totalOuters").innerHTML = `<b>${totalOuters}</b>`;
    document.getElementById("totalBags").innerHTML = `<b>${mhrBags + indBags}</b>`;
    document.getElementById("maxBags").innerText = mhrBags + indBags;

    let tickets = [];
    rows.forEach(r => {
      const product = r.children[0].innerText.trim();
      if (raffleCriteria[region][product]) {
        const ordered = +r.querySelector(".order").value || 0;
        tickets.push(Math.floor(ordered / raffleCriteria[region][product]));
      }
    });

    const totalTickets = tickets.length ? Math.min(...tickets) : 0;
    document.getElementById("raffleStatus").innerText = totalTickets > 0 ? "Eligible" : "Not Eligible";
    document.getElementById("raffleStatus").className = totalTickets > 0 ? "eligible" : "not-eligible-text";
    document.getElementById("raffleTickets").innerText = totalTickets;
    document.getElementById("maxTickets").innerText = totalTickets;
  });

});


