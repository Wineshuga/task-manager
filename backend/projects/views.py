from rest_framework import viewsets
from .models import Project, Task
from .serializers import ProjectSerializer, TaskSerializer
from rest_framework.permissions import IsAuthenticated
from telemetry import task_counter

class ProjectViewSet(viewsets.ModelViewSet):
    queryset = Project.objects.all()
    serializer_class = ProjectSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Project.objects.filter(owner=self.request.user)

class TaskViewSet(viewsets.ModelViewSet):
    serializer_class = TaskSerializer
    permission_classes = [IsAuthenticated]

    def get_queryset(self):
        return Task.objects.filter(
            project_id=self.kwargs['project_id'],
            project__owner=self.request.user
        )

    def perform_create(self, serializer):
        project = Project.objects.get(
            id=self.kwargs['project_id'],
            owner=self.request.user
        )
        serializer.save(project=project)
        task_counter.add(1)