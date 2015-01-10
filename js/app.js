/* STUDENTS IGNORE THIS FUNCTION
 * All this does is create an initial
 * attendance record if one is not found
 * within localStorage.
 */
(function() {
    if (!localStorage.attendance) {
        console.log('Creating attendance records...');
        function getRandom() {
            return (Math.random() >= 0.5);
        }

        var nameColumns = $('tbody .name-col')
            attendance = {};

        nameColumns.each(function() {
            var name = this.innerText;
            attendance[name] = [];

            for (var i = 0; i <= 11; i++) {
                attendance[name].push(getRandom());
            }
        });

        localStorage.attendance = JSON.stringify(attendance);
    }
}());


/* STUDENT APPLICATION */
$(function() {
    var model = {
        days: 12,
        students: [
            {
                name: "Slappy the Frog",
                missedDays: 0
            },
            {
                name: "Lilly the Lizard",
                missedDays: 0
            },
            {
                name: "Paulrus the Walrus",
                missedDays: 0
            },
            {
                name: "Gregory the Goat",
                missedDays: 0
            },
            {
                name: "Adam the Anaconda",
                missedDays: 0
            }
        ]
    };

    var controller = {
        init: function() {
            view.renderHeadings(controller.createHeadings(model.days));
            view.renderStudents(model.days, model.students);
        },
        createHeadings: function(days) {
            var a = [];
            for (var i = 1; i <= days; i++) {
                a.push(i);
            }
            return a;
        }
    }

    var view = {
        renderHeadings: function(days) {
            $("thead tr").append('<th class="name-col">Student Name</th>');
            var length = days.length;
            for (var i = 0; i < length; i++) {
                $("thead tr").append('<th>' + i + '</th>');
            }
            $("thead tr").append('<th class="missed-col">Days Missed-col</th>');
        },
        addStudent: function(days, student) {
            var $student = $('<tr class="student"></tr>');
            $student.append('<td class="name-col">' + student.name + '</td>');
            for (var i = 1; i <= days; i++) {
                $student.append('<td class="attend-col"><input type="checkbox"></td>');
            }
            $student.append('<td class="missed-col">' + student.missedDays + '</td>');
            $('tbody').append($student);
        },
        renderStudents: function(days, students) {
            for (student in students) {
                view.addStudent(days,students[student]);
            }
        }
    };

    var attendance = JSON.parse(localStorage.attendance),
        $allMissed = $('tbody .missed-col'),
        $allCheckboxes = $('tbody input');

    // Count a student's missed days
    function countMissing() {
        $allMissed.each(function() {
            var studentRow = $(this).parent('tr'),
                dayChecks = $(studentRow).children('td').children('input'),
                numMissed = 0;

            dayChecks.each(function() {
                if (!$(this).prop('checked')) {
                    numMissed++;
                }
            });

            $(this).text(numMissed);
        });
    }

    // Check boxes, based on attendace records
    $.each(attendance, function(name, days) {
        var studentRow = $('tbody .name-col:contains("' + name + '")').parent('tr'),
            dayChecks = $(studentRow).children('.attend-col').children('input');

        dayChecks.each(function(i) {
            $(this).prop('checked', days[i]);
        });
    });

    // When a checkbox is clicked, update localStorage
    $allCheckboxes.on('click', function() {
        var studentRows = $('tbody .student'),
            newAttendance = {};

        studentRows.each(function() {
            var name = $(this).children('.name-col').text(),
                $allCheckboxes = $(this).children('td').children('input');

            newAttendance[name] = [];

            $allCheckboxes.each(function() {
                newAttendance[name].push($(this).prop('checked'));
            });
        });

        countMissing();
        localStorage.attendance = JSON.stringify(newAttendance);
    });
    countMissing();
    controller.init();
}());
