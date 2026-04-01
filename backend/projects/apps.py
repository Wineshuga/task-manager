import uuid
from django.apps import AppConfig
import os

class ProjectsConfig(AppConfig):
    name = 'projects'

    def ready(self):
        if os.environ.get('RUN_MAIN') != 'true':
            return
        from opentelemetry import metrics
        from opentelemetry.sdk.resources import Resource
        from opentelemetry.sdk.metrics import MeterProvider
        from opentelemetry.sdk.metrics.export import PeriodicExportingMetricReader
        from opentelemetry.exporter.otlp.proto.http.metric_exporter import OTLPMetricExporter

        resource = Resource.create({
            "service.instance.id": str(uuid.uuid4())
        })

        exporter = OTLPMetricExporter()
        reader = PeriodicExportingMetricReader(exporter)

        provider = MeterProvider(metric_readers=[reader], resource=resource)

        metrics.set_meter_provider(provider)