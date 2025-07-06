"use client";

import { useAppDispatch, useAppSelector } from "@/hooks/useRedux";
import { hideHeader, showHeader } from "@/store/layoutSlice";

export default function Header() {
  const headerShown = useAppSelector((state) => state.layout.headerShown);
  const dispatch = useAppDispatch();

  if (!headerShown) return null;

  return (
    <header>
      {/* header content */}
      <h1>Header Title</h1>
      <button onClick={() => dispatch(hideHeader())}>Hide</button>
      <button onClick={() => dispatch(showHeader())}>Show</button>
    </header>
  );
}
