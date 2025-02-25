from django.db import models


class Project(models.Model):
    CATEGORY_CHOICES = [
        ('AI', 'Artificial Intelligence'),
        ('SW', 'Software Development'),
    ]

    title = models.CharField(max_length=200)
    description = models.TextField()
    category = models.CharField(max_length=2, choices=CATEGORY_CHOICES)
    image = models.ImageField(upload_to='projects/', blank=True)
    technologies = models.CharField(max_length=200)
    github_link = models.URLField(blank=True)
    demo_link = models.URLField(blank=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
