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
(function() {
    var Student =  function(name) {
            this.name = name;
            this.attendance = [false, false, true, false, false, false, false, false, false, false, false, false];
            this.missedDays = this.attendance.reduce(function(a, b) {
              return a + b;
            });;
    };

    Student.prototype.toggleAttendance = function(day) {
        this.attendance[day] = !this.attendance[day];
        this.missedDays = this.attendance.reduce(function(a, b) {
          return a + b;
        });;
    }

    Student.prototype.attendDay = function(day) {
    }

    var model = {
        days: 12,
        students: [
            new Student("Slappy the Frog"),
            new Student("Lilly the Lizard"),
            new Student("Paulrus the Walrus"),
            new Student("Gregory the Goat"),
            new Student("Adam the Anaconda")
        ],
        getStudents: function() {
            return model.students;
        }
    };

    var controller = {
        init: function() {
            view.renderHeadings(controller.createHeadings(model.days));
            view.renderStudents(model.students);
        },
        createHeadings: function(days) {
            var a = [];
            for (var i = 1; i <= days; i++) {
                a.push(i);
            }
            return a;
        },
        click: function(student, day) {
            console.log(student + ":" + day);
            model.students[student].toggleAttendance(day);
            view.renderStudents(model.students);
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
        addStudent: function(student) {
            var days = student.attendance.length;
            var $student = $('<tr class="' + student.name + '"></tr>');
            $student.append('<td class="name-col">' + student.name + '</td>');
            for (var i = 0; i < days; i++) {
                $student.append('<td class="attend-col"><input type="checkbox"' + (student.attendance[i] ? " checked" : "") + '></td>');
            }
            $student.append('<td class="missed-col">' + student.missedDays + '</td>');
            $('tbody').append($student);
        },
        renderStudents: function(students) {
            $('tbody').html('');
            for (student in students) {
                view.addStudent(students[student]);
            }
            view.addClickers();
        },
        addClickers: function() {
            $('tbody tr').each(function(row_i){
                //TODO: Change this from the td to the checkbox
                $(this).find('.attend-col').each(function(col_i){
                    $(this).click(function() {
                        controller.click(row_i, col_i);
                    });
                });
            });
        }
    };

    window.MVC = {
        model: function () {
            return model;
        },
        view: function () {
            return view;
        },
        controller: function () {
            return controller;
        } 
    };

    controller.init();
}());
