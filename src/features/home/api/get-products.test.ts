import { api } from "@/lib/api-client";
import { productMock } from "@/mocks/product.mock";
import { renderHook, waitFor } from "@testing-library/react-native";
import { useProducts } from "./get-products";

// Mock the API client
jest.mock("@/lib/api-client", () => ({
  api: jest.fn(),
}));

const mockApi = api as jest.MockedFunction<typeof api>;

describe("useProducts", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch products successfully and update state", async () => {
    const mockProducts = [productMock];
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(mockProducts),
    } as unknown as Response;

    mockApi.mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useProducts());

    // Initially should be loading
    expect(result.current.isLoading).toBe(true);
    expect(result.current.isError).toBe(false);
    expect(result.current.data).toEqual([]);

    // Wait for the fetch to complete
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Should have successful data
    expect(result.current.data).toEqual(mockProducts);
    expect(result.current.isError).toBe(false);
    expect(mockApi).toHaveBeenCalledWith("products");
  });

  it("should handle API error and set error state", async () => {
    const mockResponse = {
      ok: false,
    } as unknown as Response;

    mockApi.mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useProducts());

    // Initially should be loading
    expect(result.current.isLoading).toBe(true);
    expect(result.current.isError).toBe(false);

    // Wait for the fetch to complete
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Should have error state
    expect(result.current.isError).toBe(true);
    expect(result.current.data).toEqual([]);
    expect(mockApi).toHaveBeenCalledWith("products");
  });

  it("should handle network error and set error state", async () => {
    mockApi.mockRejectedValue(new Error("Network error"));

    const { result } = renderHook(() => useProducts());

    // Initially should be loading
    expect(result.current.isLoading).toBe(true);
    expect(result.current.isError).toBe(false);

    // Wait for the fetch to complete
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Should have error state
    expect(result.current.isError).toBe(true);
    expect(result.current.data).toEqual([]);
  });

  it("should handle JSON parsing error and set error state", async () => {
    const consoleErrorSpy = jest.spyOn(console, "error").mockImplementation();

    const mockResponse = {
      ok: true,
      json: jest.fn().mockRejectedValue(new Error("Invalid JSON")),
    } as unknown as Response;

    mockApi.mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useProducts());

    // Initially should be loading
    expect(result.current.isLoading).toBe(true);
    expect(result.current.isError).toBe(false);

    // Wait for the fetch to complete
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Should have error state
    expect(result.current.isError).toBe(true);
    expect(result.current.data).toEqual([]);
  });

  it("should call API with correct endpoint", async () => {
    const mockProducts = [productMock];
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(mockProducts),
    } as unknown as Response;

    mockApi.mockResolvedValue(mockResponse);

    renderHook(() => useProducts());

    await waitFor(() => {
      expect(mockApi).toHaveBeenCalledWith("products");
    });
  });
});
