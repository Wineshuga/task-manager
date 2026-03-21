from django.apps import AppConfig
import os

class ProjectsConfig(AppConfig):
    name = 'projects'

    def ready(self):
        if os.environ.get('RUN_MAIN') != 'true':
            return
        from opentelemetry import metrics
        from opentelemetry.sdk.metrics import MeterProvider
        from opentelemetry.exporter.prometheus import PrometheusMetricReader
        from opentelemetry.sdk.resources import SERVICE_NAME, Resource
        from prometheus_client import start_http_server

        resource = Resource.create(attributes={SERVICE_NAME: "task-manager"})
        start_http_server(port=9464)
        reader = PrometheusMetricReader()
        provider = MeterProvider(resource=resource, metric_readers=[reader])
        metrics.set_meter_provider(provider)
