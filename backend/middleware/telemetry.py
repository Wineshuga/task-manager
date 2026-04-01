import time

class MetricsMiddleware:
    def __init__(self, get_response):
        self.get_response = get_response
        self.http_requests = None
        self.http_latency = None

    def _setup_meters(self):
        from opentelemetry import metrics
        meter = metrics.get_meter("task_manager.http")
        self.http_requests = meter.create_counter("api.request.count")
        self.http_latency = meter.create_histogram("api.request.duration", unit="ms")

    def __call__(self, request):
        if self.http_requests is None:
            self._setup_meters()

        start = time.time()
        response = self.get_response(request)
        duration = (time.time() - start) * 1000
        attrs = {
            "http.method": request.method,
            "http.status_code": str(response.status_code),
            "http.route": request.resolver_match.route if request.resolver_match else "unknown",
        }
        self.http_requests.add(1, attrs)
        self.http_latency.record(duration, attrs)
        return response