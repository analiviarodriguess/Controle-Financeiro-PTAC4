import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import BuscaLancamentos from "./BuscaLancamentos";

describe("BuscaLancamentos", () => {
  it("avisa o que foi digitado", () => {
    const aoMudar = vi.fn();
    render(<BuscaLancamentos valor="" aoMudar={aoMudar} />);

    fireEvent.change(screen.getByLabelText(/Buscar/), {
      target: { value: "almo" },
    });

    expect(aoMudar).toHaveBeenCalledWith("almo");
  });
});
