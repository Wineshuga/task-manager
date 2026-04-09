from django.apps import AppConfig

class ProjectsConfig(AppConfig):
    name = 'projects'

    def ready(self):
        from opentelemetry.exporter.otlp.proto.http.metric_exporter import OTLPMetricExporter
        from opentelemetry import metrics
        from opentelemetry.sdk.metrics import MeterProvider 
        from opentelemetry.sdk.metrics.export import PeriodicExportingMetricReader
        from opentelemetry.sdk.resources import SERVICE_NAME, Resource

        resource = Resource(attributes={SERVICE_NAME: "task-manager"})
        exporter = OTLPMetricExporter(endpoint="http://localhost:4318/v1/metrics")
        reader = PeriodicExportingMetricReader(exporter)
        meterProvider = MeterProvider(resource=resource, metric_readers=[reader])
        metrics.set_meter_provider(meterProvider)
