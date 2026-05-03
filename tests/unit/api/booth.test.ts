import { describe, it, expect, vi, beforeEach } from 'vitest';
import { GET, HEAD } from '@/app/api/booth/route';
import { findBoothsByPin, findNearestBooths, isValidPinArea } from '@/lib/booth';
import { NotFoundError, ValidationError } from '@/lib/errors';

vi.mock('@/lib/booth', () => ({
  findBoothsByPin: vi.fn(),
  findNearestBooths: vi.fn(),
  isValidPinArea: vi.fn(),
}));

describe('Booth API Route', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  const createGetRequest = (url: string, ip: string = '127.0.0.1') => {
    return new Request(url, {
      method: 'GET',
      headers: {
        'x-forwarded-for': ip,
      },
    });
  };

  const createHeadRequest = (url: string, ip: string = '127.0.0.1') => {
    return new Request(url, {
      method: 'HEAD',
      headers: {
        'x-forwarded-for': ip,
      },
    });
  };

  describe('GET Handler', () => {
    it('returns 200 for valid PIN search', async () => {
      const mockBooths = [{ id: '1', name: 'Booth 1', pinCode: '110001', accessibility: { wheelchair: true } }];
      vi.mocked(findBoothsByPin).mockReturnValueOnce(mockBooths as ReturnType<typeof findBoothsByPin>);

      const req = createGetRequest('http://localhost/api/booth?pin=110001');
      const res = await GET(req);
      const data = await res.json();

      expect(res.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.booths).toHaveLength(1);
      expect(data.searchType).toBe('pin');
      expect(findBoothsByPin).toHaveBeenCalledWith('110001');
    });

    it('returns 200 for valid coordinate search', async () => {
      const mockBooths = [{ id: '2', name: 'Booth 2', lat: 28.6, lng: 77.2 }];
      vi.mocked(findNearestBooths).mockReturnValueOnce(mockBooths as ReturnType<typeof findNearestBooths>);

      const req = createGetRequest('http://localhost/api/booth?lat=28.6&lng=77.2&radius=10');
      const res = await GET(req);
      const data = await res.json();

      expect(res.status).toBe(200);
      expect(data.success).toBe(true);
      expect(data.booths).toHaveLength(1);
      expect(data.searchType).toBe('coordinates');
      expect(findNearestBooths).toHaveBeenCalledWith(28.6, 77.2, 10);
    });

    it('returns 400 for missing params', async () => {
      const req = createGetRequest('http://localhost/api/booth');
      const res = await GET(req);
      
      expect(res.status).toBe(400);
    });

    it('returns 400 for invalid PIN format', async () => {
      vi.mocked(findBoothsByPin).mockImplementationOnce(() => {
        throw new ValidationError('Invalid PIN');
      });

      const req = createGetRequest('http://localhost/api/booth?pin=invalid');
      const res = await GET(req);
      
      expect(res.status).toBe(400);
    });

    it('returns 400 for incomplete coordinates', async () => {
      const req = createGetRequest('http://localhost/api/booth?lat=28.6');
      const res = await GET(req);
      
      expect(res.status).toBe(400);
    });

    it('returns 400 for invalid coordinate ranges', async () => {
      const req = createGetRequest('http://localhost/api/booth?lat=notanumber&lng=77.2');
      const res = await GET(req);
      
      expect(res.status).toBe(400);
    });

    it('returns 404 when no booths found', async () => {
      vi.mocked(findBoothsByPin).mockImplementationOnce(() => {
        throw new NotFoundError('Not found');
      });

      const req = createGetRequest('http://localhost/api/booth?pin=999999');
      const res = await GET(req);
      
      expect(res.status).toBe(404);
    });

    it('returns 500 for unexpected errors', async () => {
      vi.mocked(findBoothsByPin).mockImplementationOnce(() => {
        throw new Error('Database connection failed');
      });

      const req = createGetRequest('http://localhost/api/booth?pin=110001');
      const res = await GET(req);
      
      expect(res.status).toBe(500);
    });

    it('returns 429 for rate limiting', async () => {
      vi.mocked(findBoothsByPin).mockReturnValue([]);
      
      let res;
      // Max requests is 30, so do 35
      for (let i = 0; i < 35; i++) {
        const req = createGetRequest('http://localhost/api/booth?pin=110001', '5.5.5.5');
        res = await GET(req);
      }
      
      expect(res?.status).toBe(429);
    });
  });

  describe('HEAD Handler', () => {
    it('returns 200 for valid known PIN area', async () => {
      vi.mocked(isValidPinArea).mockReturnValueOnce(true);

      const req = createHeadRequest('http://localhost/api/booth?pin=110001');
      const res = await HEAD(req);
      
      expect(res.status).toBe(200);
    });

    it('returns 404 for unknown PIN area', async () => {
      vi.mocked(isValidPinArea).mockReturnValueOnce(false);

      const req = createHeadRequest('http://localhost/api/booth?pin=999999');
      const res = await HEAD(req);
      
      expect(res.status).toBe(404);
    });

    it('returns 400 for missing PIN param', async () => {
      const req = createHeadRequest('http://localhost/api/booth');
      const res = await HEAD(req);
      
      expect(res.status).toBe(400);
    });

    it('returns 400 for invalid PIN format', async () => {
      const req = createHeadRequest('http://localhost/api/booth?pin=invalid');
      const res = await HEAD(req);
      
      expect(res.status).toBe(400);
    });
  });
});
