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
            this.missedDays = 0;
            this.attendance = [];
    };

    Student.prototype.missDay = function(day) {
        this.attendance[day] = false;
        this.missedDays += 1;
    }

    Student.prototype.attendDay = function(day) {
        this.attendance[day] = true;
        this.missedDays -= 1;
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
            var $student = $('<tr class="' + student.name + '"></tr>');
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
