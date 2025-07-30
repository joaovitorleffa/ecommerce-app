import { api } from "@/lib/api-client";
import { productMock } from "@/mocks/product.mock";
import { renderHook, waitFor } from "@testing-library/react-native";
import { useProduct } from "./get-product";

// Mock the API client
jest.mock("@/lib/api-client", () => ({
  api: jest.fn(),
}));

const mockApi = api as jest.MockedFunction<typeof api>;

describe("useProduct", () => {
  const productId = 1;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it("should fetch product successfully and update state", async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(productMock),
    } as unknown as Response;

    mockApi.mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useProduct(productId));

    // Initially should be loading
    expect(result.current.isLoading).toBe(true);
    expect(result.current.isError).toBe(false);
    expect(result.current.data).toBeNull();

    // Wait for the fetch to complete
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Should have successful data
    expect(result.current.data).toEqual(productMock);
    expect(result.current.isError).toBe(false);
    expect(mockApi).toHaveBeenCalledWith(`products/${productId}`);
  });

  it("should handle API error and set error state", async () => {
    const mockResponse = {
      ok: false,
    } as unknown as Response;

    mockApi.mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useProduct(productId));

    // Initially should be loading
    expect(result.current.isLoading).toBe(true);
    expect(result.current.isError).toBe(false);

    // Wait for the fetch to complete
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Should have error state
    expect(result.current.isError).toBe(true);
    expect(result.current.data).toBeNull();
    expect(mockApi).toHaveBeenCalledWith(`products/${productId}`);
  });

  it("should handle JSON parsing error and set error state", async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockRejectedValue(new Error("Invalid JSON")),
    } as unknown as Response;

    mockApi.mockResolvedValue(mockResponse);

    const { result } = renderHook(() => useProduct(productId));

    // Initially should be loading
    expect(result.current.isLoading).toBe(true);
    expect(result.current.isError).toBe(false);

    // Wait for the fetch to complete
    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });

    // Should have error state
    expect(result.current.isError).toBe(true);
    expect(result.current.data).toBeNull();
  });

  it("should call API with correct endpoint", async () => {
    const mockResponse = {
      ok: true,
      json: jest.fn().mockResolvedValue(productMock),
    } as unknown as Response;

    mockApi.mockResolvedValue(mockResponse);

    renderHook(() => useProduct(productId));

    await waitFor(() => {
      expect(mockApi).toHaveBeenCalledWith(`products/${productId}`);
    });
  });

  it("should not fetch when productId is not provided", () => {
    renderHook(() => useProduct(0));

    expect(mockApi).not.toHaveBeenCalled();
  });
});
