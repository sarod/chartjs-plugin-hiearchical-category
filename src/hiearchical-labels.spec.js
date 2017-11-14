import {
  countLeafLabels,
  validateLabels,
  computeLeafLabels
} from "./hiearchical-labels";

const flatCategories = ["Label1", "Label2"];

const twoLevelCategories = [
  { label: "USA", children: ["New York", "San Francisco"] },
  { label: "Canada", children: ["Toronto", "Vancouver"] }
];

const denormalizedCategories = [
  { label: "USA", children: ["New York", "San Francisco"] },
  "Monaco"
];

describe(" omputeLeafLabels", () => {
  test("should support flat categories", () => {
    expect(computeLeafLabels(flatCategories)).toEqual(flatCategories);
  });

  test("should support twoLevelCategories", () => {
    expect(computeLeafLabels(twoLevelCategories)).toEqual([
      "New York",
      "San Francisco",
      "Toronto",
      "Vancouver"
    ]);
  });

  test("should support denormalizedCategories", () => {
    expect(computeLeafLabels(denormalizedCategories)).toEqual([
      "New York",
      "San Francisco",
      "Monaco"
    ]);
  });
});

describe("countLeafLabels", () => {
  test("countLeafLabels should support flat categories", () => {
    expect(countLeafLabels(flatCategories)).toBe(2);
  });

  test("countLeafLabels should support twoLevelCategories categories", () => {
    expect(countLeafLabels(twoLevelCategories)).toBe(4);
  });

  test("countLeafLabels should support denormalized categories", () => {
    expect(countLeafLabels(denormalizedCategories)).toBe(3);
  });
});

describe("validateLabels", () => {
  test("should validate flat categories", () => {
    expect(() => validateLabels(flatCategories)).not.toThrow();
  });

  test("should validated twoLevelCategories", () => {
    expect(() => validateLabels(twoLevelCategories)).not.toThrow();
  });

  test("should validated denormalizedCategories", () => {
    expect(() => validateLabels(denormalizedCategories)).not.toThrow();
  });

  test("should throw on non array labels", () => {
    expect(() => validateLabels({})).toThrowError(
      "labels must be an array but was not."
    );
  });

  test("should throw on non string element with missing properties", () => {
    expect(() => validateLabels([{}])).toThrowError(
      "Element [0] in labels is malformed it must be either a string or an object with label and children properties."
    );
  });
});
