const blockOrders = ['A-B-C-D', 'B-A-D-C', 'C-D-A-B', 'D-C-B-A']

document.addEventListener('DOMContentLoaded', function() {
  let calendarEl = document.getElementById('calendar');
  let calendar = new FullCalendar.Calendar(calendarEl, {
    initialView: 'dayGridMonth',
    headerToolbar: {
      left: 'prev,next today',
      center: 'title',
      right: 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
    },
    buttonText: {
      list: "agenda"
    },
    navLinks: true,
    eventColor: '#623C5B',
    eventClassNames: function(arg) {
      if (blockOrders.includes(arg.event.title)) {
        return [ 'block-order' ]
      }
    },
    eventDidMount: function(arg) {
      if (!blockOrders.includes(arg.event.title)) {
        tippy(arg.el, {
          content: arg.event.title,
          theme: 'light-border',
          placement: 'top',
          duration: 0,
          offset: [0, 10],
        });
      }
    },
    validRange: {
      // only show 30 days back and 12 months forward
      start: new Date(new Date().setDate(new Date().getDate() - 30)),
      end: new Date(new Date().setDate(new Date().getDate() + 365))
    },
    nowIndicator: true,
    // businessHours: {
    //   daysOfWeek: [1, 2, 3, 4, 5],
    //   startTime: '08:30',
    //   endTime: '16:43'
    // },

    events: async function (fetchInfo, successCallback, failureCallback) {
        try {
          const response = await fetch(
            "/orca-news/data?api=a"
          );
          const data = await response.json();

          const events = data.map((event) => {
            return {
              title: event.name,
              start: event.date + (event.start24 ? "T" + event.start24 : ""),
              end: event.end ? event.date + "T" + event.end : null,
            };
          });

          successCallback(events);
        } catch (error) {
          console.error("Error fetching events:", error);
          alert("Events could not be loaded. Please try again later.");
          failureCallback(error);
        }},
  });
  calendar.render();

  document.getElementById('loading-message').remove();
  document.getElementById('body').setAttribute(
    'style', 'cursor: auto !important;');
});