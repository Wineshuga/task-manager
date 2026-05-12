from django.apps import AppConfig

class ProjectsConfig(AppConfig):
    name = 'projects'

    def ready(self):
        from opentelemetry import metrics
        from opentelemetry.sdk.metrics import MeterProvider 
        from opentelemetry.sdk.resources import SERVICE_NAME, Resource

        resource = Resource(attributes={SERVICE_NAME: "task-manager"})
        meterProvider = MeterProvider(resource=resource)
        metrics.set_meter_provider(meterProvider)
