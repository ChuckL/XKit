//* TITLE Editable Reblogs **//
//* VERSION 2.1.0 **//
//* DESCRIPTION	Restores ability to edit previous reblogs of a post **//
//* DEVELOPER new-xkit **//
//* FRAME false **//
//* BETA false **//

XKit.extensions.editable_reblogs = new Object({

	running: false,

	run: function() {
		this.running = true;

		XKit.interface.post_window_listener.add("editable_reblogs", XKit.extensions.editable_reblogs.post_window);
		XKit.tools.add_css(".control-reblog-tree {display: none; } .post-form--header .reblog-title {margin: 10px; color: #444} ", "editable_reblogs_remove_content_tree");
	},

	post_window: function() {
		var is_legacy = $(".reblog-tree").length > 0;
		if (is_legacy) {
			XKit.extensions.editable_reblogs.post_window_legacy();
			return;
		}
		var reblog_tree = $(".post-form .reblog-list");
		if (reblog_tree.length <= 0) {
			return;
		}

		var all_quotes = [];
		// Guard against double evaluation by marking the tree as processed
		var processed_class = 'xkit-editable-reblogs-done';
		if (reblog_tree.hasClass(processed_class)) {
			return;
		}
		reblog_tree.addClass(processed_class);

		var title = reblog_tree.find('.reblog-title');
		$('.post-form--header').append(title);
		reblog_tree.find(".reblog-list-item").each(function(index) {
			var reblog_data = {
				reblog_content: $(this).find('.reblog-content').html() ? $(this).find('.reblog-content').html() : '',
				reblog_author: $(this).find('.reblog-tumblelog-name').text() ? $(this).find('.reblog-tumblelog-name').text() : '',
				reblog_url: $(this).find('.reblog-tumblelog-name').attr('href') ? $(this).find('.reblog-tumblelog-name').attr('href') : ''
			};
			all_quotes.push(reblog_data);
		});
		var all_quotes_text = "";
		all_quotes.forEach(function(data, index, all) {
			var reblog_content = data.reblog_content.replace("tmblr-truncated read_more_container", "");
			//don't wrap if the previous user didn't add a comment
			if (reblog_content.indexOf("</blockquote>", reblog_content.length - 13) !== -1 || reblog_content.length === 0) {
				all_quotes_text = reblog_content;
			} else {
				all_quotes_text = "<p><a class='tumblr_blog' href='" + data.reblog_url + "'>" + data.reblog_author + "</a>:</p><blockquote>" + all_quotes_text + reblog_content + "</blockquote>";
			}
		});
		var old_content = XKit.interface.post_window.get_content_html();
		//add 'tumblr_blog' class to all tumblr.com links
		var nodes = $(all_quotes_text + old_content);
		nodes.find('a[href*="tumblr.com"]').addClass('tumblr_blog');
		var nodes_text = $('<div>').append($(nodes).clone()).html(); 
		XKit.interface.post_window.set_content_html(nodes_text);
		//run submission cleanup before post is submitted
		$('.controls-container').on('click', '.create_post_button', XKit.extensions.editable_reblogs.process_submit);

		$(".btn-remove-trail .icon").click();
		$(".control-reblog-trail").hide();
	},
	process_submit: function(e) {
		e.preventDefault();
		//sneak this change in through the HTML editor (adding content to the rich text editor changes 'tumblr_blog' back to "tumblr_blog")
		XKit.extensions.editable_reblogs.format_post_content_via_html_editor();
	},

	/**
	 * Uses sneaky HTML editor magic to handle singlequote issues with editable reblogs
	 */
	format_post_content_via_html_editor: function() {
		if ($(".html-field").css("display") === "none") {
			//tumblr_blog must be wrapped in single quotes, not double, or the dash will nom the shit out of your post
			var text = XKit.interface.post_window.get_content_html();
			text = text.replace(/"tumblr_blog"/g, "'tumblr_blog'");
			//also remove empty HTML if the user hasn't added anything
			if (text.indexOf("<p><br></p>", text.length - 11) !== -1) {
				text = text.substring(0, text.length - 11);
			}
			XKit.tools.add_function(function(){
				var new_content = add_tag[0];
				var editor_div = document.getElementsByClassName("ace_editor");
				if (editor_div.length === 1) {
					var editor = window.ace.edit(editor_div[0]);
					editor.setValue(new_content);
					setTimeout(function(){
						jQuery(".ace_marker-layer").empty();
					}, 500);
				}
			}, true, [text]);
		} else {
			XKit.tools.add_function(function(){
				var editor_div = document.getElementsByClassName("ace_editor");
				if (editor_div.length === 1) {
					var editor = window.ace.edit(editor_div[0]);
					var content = editor.getValue();
					//tumblr_blog must be wrapped in single quotes, not double, or the dash will nom the shit out of your post
					content = content.replace(/"tumblr_blog"/g, "'tumblr_blog'");
					editor.setValue(content);
					setTimeout(function(){
						jQuery(".ace_marker-layer").empty();
					}, 500);
				}
			}, true, []);
		}
	},
	post_window_legacy: function() {
		var reblog_tree = $(".reblog-tree");
		if (reblog_tree.length <= 0) {
			return;
		}

		// Guard against double evaluation by marking the tree as processed
		var processed_class = 'xkit-editable-reblogs-done';
		if (reblog_tree.hasClass(processed_class)) {
			return;
		}
		reblog_tree.addClass(processed_class);

		// Convert all of the user links to have class tumblr_blog
		var top_quote_link = reblog_tree.find('p:first-child > a:first-child');
		var quote_links = reblog_tree.find('blockquote > p:first-child > a:first-child');

		if (top_quote_link.length > 0) {
			$(top_quote_link[0]).addClass('tumblr_blog');
		}
		quote_links.each(function() {
			$(this).addClass('tumblr_blog');
		});

		var reblog_content = reblog_tree.html();

		var old_content = XKit.interface.post_window.get_content_html();
		XKit.interface.post_window.set_content_html(reblog_content + old_content);

		$(".btn-remove-tree").click();
	},
	destroy: function() {
		this.running = false;
		XKit.tools.remove_css("editable_reblogs_remove_content_tree");
		XKit.interface.post_window_listener.remove("editable_reblogs");
	}
});
