from django.apps import AppConfig
from opentelemetry import metrics
from opentelemetry.sdk.metrics import MeterProvider
from opentelemetry.sdk.metrics.export import (
    ConsoleMetricExporter,
    PeriodicExportingMetricReader,
)

class ProjectsConfig(AppConfig):
    name = 'projects'

    def ready(self):
        metric_reader = PeriodicExportingMetricReader(ConsoleMetricExporter())
        provider = MeterProvider(metric_readers=[metric_reader])

        # Sets the global default meter provider
        metrics.set_meter_provider(provider)
