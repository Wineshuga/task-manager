from django.apps import AppConfig
from opentelemetry import metrics

class ProjectsConfig(AppConfig):
    name = 'projects'

    def ready(self):
        from opentelemetry.exporter.otlp.proto.http.metric_exporter import OTLPMetricExporter
        from opentelemetry import metrics
        from opentelemetry.sdk.metrics import MeterProvider 
        from opentelemetry.sdk.metrics.export import PeriodicExportingMetricReader
        from opentelemetry.sdk.resources import SERVICE_NAME, Resource
        resource = Resource(attributes={
                SERVICE_NAME: "task-manager"
            })

        exporter = OTLPMetricExporter()
        reader = PeriodicExportingMetricReader(exporter)

        meter_provider = MeterProvider(
                resource=resource,
                metric_readers=[reader]
            )

        metrics.set_meter_provider(meter_provider)