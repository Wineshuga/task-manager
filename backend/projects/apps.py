from django.apps import AppConfig
from opentelemetry import metrics
from opentelemetry.sdk.metrics import MeterProvider
from opentelemetry.exporter.prometheus import PrometheusMetricReader
from prometheus_client import start_http_server
from opentelemetry.sdk.resources import SERVICE_NAME, Resource

class ProjectsConfig(AppConfig):
    name = 'projects'

    def ready(self):
        # Service name is required for most backends
        resource = Resource.create(attributes={
            SERVICE_NAME: "task_manager"
        })

        # Start Prometheus client
        start_http_server(port=9464, addr="localhost")
        reader = PrometheusMetricReader()
        provider = MeterProvider(resource=resource, metric_readers=[reader])
        # Sets the global default meter provider
        metrics.set_meter_provider(provider)
