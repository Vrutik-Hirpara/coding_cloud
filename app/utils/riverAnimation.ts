import React from "react";

export const riverEnter = (e: React.MouseEvent<HTMLButtonElement>) => {
  const t = e.currentTarget.querySelector(".btn-navbar-text") as HTMLElement | null;
  if (!t) return;

  t.classList.remove("river-out");
  void t.offsetWidth;
  t.classList.add("river-in");
};

export const riverLeave = (e: React.MouseEvent<HTMLButtonElement>) => {
  const t = e.currentTarget.querySelector(".btn-navbar-text") as HTMLElement | null;
  if (!t) return;

  t.classList.remove("river-in");
  void t.offsetWidth;
  t.classList.add("river-out");
};