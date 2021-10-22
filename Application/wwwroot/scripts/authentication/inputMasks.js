$('#phone-number').mask('+38(000) 000-00-00');

$.validator.methods.email = function (value, element) {
    return this.optional(element) ||
        /^[a-zA-Z0-9.,_]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/.test(value);
}
