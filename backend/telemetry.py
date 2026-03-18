from opentelemetry import metrics

meter = metrics.get_meter("task_manager")

task_counter = meter.create_counter(
    "task.counter", unit="1", description="Counts the number of task created"
)

project_counter = meter.create_counter(
    "project.counter", unit="1", description="Counts the number of project created")