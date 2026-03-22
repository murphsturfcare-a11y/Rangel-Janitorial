import React from "react";
import { render } from "@testing-library/react";
import { JsonLd } from "@/components/seo/JsonLd";

describe("JsonLd", () => {
  function getScriptContent(container: HTMLElement): string {
    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    expect(script).not.toBeNull();
    return script!.innerHTML;
  }

  it("renders a script tag with type application/ld+json", () => {
    const schema = { "@type": "Organization", name: "Test" };
    const { container } = render(<JsonLd schema={schema} />);

    const script = container.querySelector(
      'script[type="application/ld+json"]',
    );
    expect(script).toBeInTheDocument();
    expect(script!.getAttribute("type")).toBe("application/ld+json");
  });

  it("renders valid JSON matching the input schema", () => {
    const schema = { "@type": "Organization", name: "Acme Corp", foundingYear: 2020 };
    const { container } = render(<JsonLd schema={schema} />);

    const content = getScriptContent(container);
    const parsed = JSON.parse(content);
    expect(parsed).toEqual(schema);
  });

  it("escapes HTML angle brackets < to \\u003c for XSS safety", () => {
    const schema = { name: "<script>alert('xss')</script>" };
    const { container } = render(<JsonLd schema={schema} />);

    const content = getScriptContent(container);
    expect(content).not.toContain("<script>");
    expect(content).not.toContain("</script>");
    expect(content).toContain("\\u003c");

    const parsed = JSON.parse(content);
    expect(parsed.name).toBe("<script>alert('xss')</script>");
  });

  it("handles nested objects correctly", () => {
    const schema = {
      "@type": "Organization",
      name: "Test Corp",
      address: {
        "@type": "PostalAddress",
        streetAddress: "123 Main St",
        addressLocality: "Springfield",
        geo: {
          "@type": "GeoCoordinates",
          latitude: 39.78,
          longitude: -89.65,
        },
      },
    };
    const { container } = render(<JsonLd schema={schema} />);

    const content = getScriptContent(container);
    const parsed = JSON.parse(content);
    expect(parsed).toEqual(schema);
    expect(parsed.address.geo.latitude).toBe(39.78);
  });

  it("handles empty schema {}", () => {
    const schema = {};
    const { container } = render(<JsonLd schema={schema} />);

    const content = getScriptContent(container);
    expect(content).toBe("{}");

    const parsed = JSON.parse(content);
    expect(parsed).toEqual({});
  });

  it("handles schema with arrays", () => {
    const schema = {
      "@type": "Organization",
      name: "Test Corp",
      sameAs: [
        "https://twitter.com/test",
        "https://facebook.com/test",
        "https://linkedin.com/company/test",
      ],
      founders: [
        { "@type": "Person", name: "Alice" },
        { "@type": "Person", name: "Bob" },
      ],
    };
    const { container } = render(<JsonLd schema={schema} />);

    const content = getScriptContent(container);
    const parsed = JSON.parse(content);
    expect(parsed).toEqual(schema);
    expect(parsed.sameAs).toHaveLength(3);
    expect(parsed.founders[0].name).toBe("Alice");
  });

  it("works with a realistic schema.org Organization object", () => {
    const schema = {
      "@context": "https://schema.org",
      "@type": "Organization",
      name: "Murphy's Turf",
      url: "https://murphysturf.com",
      logo: "https://murphysturf.com/logo.png",
      description: "Premium turf & landscaping services",
      address: {
        "@type": "PostalAddress",
        streetAddress: "456 Green Ave",
        addressLocality: "Dublin",
        addressRegion: "Leinster",
        postalCode: "D01 AB12",
        addressCountry: "IE",
      },
      contactPoint: {
        "@type": "ContactPoint",
        telephone: "+353-1-234-5678",
        contactType: "customer service",
      },
      sameAs: [
        "https://facebook.com/murphysturf",
        "https://instagram.com/murphysturf",
      ],
    };
    const { container } = render(<JsonLd schema={schema} />);

    const content = getScriptContent(container);
    const parsed = JSON.parse(content);
    expect(parsed["@context"]).toBe("https://schema.org");
    expect(parsed["@type"]).toBe("Organization");
    expect(parsed.name).toBe("Murphy's Turf");
    expect(parsed.address["@type"]).toBe("PostalAddress");
    expect(parsed.contactPoint.telephone).toBe("+353-1-234-5678");
    expect(parsed.sameAs).toHaveLength(2);
  });

  it("does not pretty-print the JSON (uses null, 0 args to JSON.stringify)", () => {
    const schema = { "@type": "Organization", name: "Test", nested: { key: "value" } };
    const { container } = render(<JsonLd schema={schema} />);

    const content = getScriptContent(container);
    expect(content).not.toContain("\n");
    expect(content).not.toContain("  ");
    expect(content).toBe(JSON.stringify(schema, null, 0));
  });
});
