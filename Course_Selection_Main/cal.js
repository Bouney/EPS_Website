window.addEventListener("load", function () {
  var calendarEl = document.getElementById("calendar");
  var calendar = new FullCalendar.Calendar(calendarEl, {
      initialView: "dayGridMonth", 
      showNonCurrentDates: false, //depends if you wanna show other dates, too visually messy
      fixedWeekCount: false,
      headerToolbar: {left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        },
        events: async function (fetchInfo, successCallback, failureCallback) {
          try {
            const response = await fetch(
              "/orca-news/data?api=a"
            );
            const data = await response.json();

            const events = data.map((event) => {
              return {
                title: event.name,
                start:
                  event.date + (event.start24 ? "T" + event.start24 : ""),
                end: event.end ? event.date + "T" + event.end : null,
              };
            });

            successCallback(events);
          } catch (error) {
            console.error("Error fetching events:", error);
            failureCallback(error);
          }},
  });
  calendar.render();
});