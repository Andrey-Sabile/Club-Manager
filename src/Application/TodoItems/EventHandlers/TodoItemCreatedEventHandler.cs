using Club_Manager.Domain.Events;
using Microsoft.Extensions.Logging;

namespace Club_Manager.Application.TodoItems.EventHandlers;

public class TodoItemCreatedEventHandler : INotificationHandler<TodoItemCreatedEvent>
{
    private readonly ILogger<TodoItemCreatedEventHandler> _logger;

    public TodoItemCreatedEventHandler(ILogger<TodoItemCreatedEventHandler> logger)
    {
        _logger = logger;
    }

    public Task Handle(TodoItemCreatedEvent notification, CancellationToken cancellationToken)
    {
        _logger.LogInformation("Club_Manager Domain Event: {DomainEvent}", notification.GetType().Name);

        return Task.CompletedTask;
    }
}
