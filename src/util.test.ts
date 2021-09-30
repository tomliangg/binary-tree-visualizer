import { buildTree, decode } from "./util";

describe("decode function", () => {
  it("should decode a commas separated string", () => {
    expect(decode("1,2,3")).toEqual(["1", "2", "3"]);
    expect(decode("1,2, null, 3")).toEqual(["1", "2", null, "3"]);
    expect(decode("1")).toEqual(["1"]);
    expect(decode("null")).toEqual([null]);
    expect(decode("")).toEqual([]);
  });
});

describe("buildTree function", () => {
  it("should build tree from level order traversal", () => {
    expect(buildTree([1, 2, 3])).toEqual({
      name: 1,
      children: [
        {
          name: 2,
          children: []
        },
        {
          name: 3,
          children: []
        }
      ]
    });
  });

  it("should build tree that has only left children", () => {
    expect(buildTree([1, 2, null])).toEqual({
      name: 1,
      children: [
        {
          name: 2,
          children: []
        },
        {
          name: null,
          children: []
        }
      ]
    });
  });

  it("should build tree that has only right children", () => {
    expect(buildTree([1, null, 3, null, 4])).toEqual({
      name: 1,
      children: [
        {
          name: null,
          children: []
        },
        {
          name: 3,
          children: [
            {
              name: null,
              children: []
            },
            {
              name: 4,
              children: []
            }
          ]
        }
      ]
    });
  });

  it("should handle invalid level order traversal input", () => {
    expect.assertions(1);
    try {
      buildTree([1, null, null, 2]);
    } catch (e) {
      if (e instanceof Error) {
        expect(e.message).toBe("Not a valid level order traversal input");
      }
    }
  });
});
